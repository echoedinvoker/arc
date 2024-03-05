import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { scale } from '.';

export class ArcBarRenderer {
  constructor(
    private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
  ) {

  }

  update(items: ItemModel) {
    const { r, x, c } = scale
    const { getMenu: menu } = items

    const arcGenerator = d3.arc()
      .innerRadius((d: any) => x(d.name)!)
      .outerRadius((d: any) => x(d.name)! + x.bandwidth())
      .startAngle(() => r(0) * Math.PI / 180)
      .endAngle((d: any) => r(d.orders) * Math.PI / 180)

    const arcs = this.group.selectAll('.arc')
      .data(menu, (d: any) => d.name)

    arcs.exit().remove();


    arcs
      .transition().duration(750)
      .attrTween('d', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-d'), d.orders)
        return (t: any) => arcGenerator({ ...d, orders: i(t) })!;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-d', d.orders);
      })

    arcs.enter().append('path')
      .attr('class', 'arc')
      .attr('fill', d => c(d.name))
      .transition().duration(750)
      .attrTween('d', (d: any) => {
        const i = d3.interpolate(0, d.orders);
        return (t: any) => arcGenerator({ ...d, orders: i(t) })!;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-d', d.orders)
      })


    this.group.attr('transform', `translate(300, 300)`)
  }
}
