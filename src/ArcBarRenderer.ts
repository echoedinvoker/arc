import * as d3 from 'd3';
import { ScaleGenerator } from './ScaleGenerator';
import { ItemModel } from './ItemModel';

export class ArcBarRenderer {
  constructor(
    private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    private scale: ScaleGenerator
  ) {

  }

  update(items: ItemModel) {
    const { r, x } = this.scale
    const { getMenu: menu } = items

    // 定義一個 d3.arc 來生成弧形
    const arcGenerator = d3.arc()
      .innerRadius((d: any) => x(d.name)!)
      .outerRadius((d: any) => x(d.name)! + x.bandwidth())
      .startAngle(() => r(0) * Math.PI / 180)
      .endAngle((d: any) => r(d.orders) * Math.PI / 180)

    // 綁定數據
    const arcs = this.group.selectAll('.arc')
      .data(menu, (d: any) => d.name)

    // 移除多餘的弧
    arcs.exit().remove();


    arcs
      .attr('fill', 'orange')
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
      .attr('fill', 'orange')
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
