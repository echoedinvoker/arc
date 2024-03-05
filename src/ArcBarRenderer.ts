import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { scale } from '.';

export class ArcBarRenderer {
  constructor(
    private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
  ) {

  }

  cbStartAngle = () => scale.r(0) * Math.PI / 180
  cbEndAngle = (d: any) => scale.r(d.orders) * Math.PI / 180
  cbEndAngleTween = (orders: number) => scale.r(orders) * Math.PI / 180
  cbMiddleAngle = (d: any) => (this.cbStartAngle() + this.cbEndAngle(d)) / 2
  cbMiddleAngleTween = (orders: number) => (this.cbStartAngle() + this.cbEndAngleTween(orders)) / 2
  cbInnerRadius = (d: any) => scale.x(d.name)!
  cbOuterRadius = (d: any) => scale.x(d.name)! + scale.x.bandwidth()
  cbTextPosition = (d: any) => ((this.cbInnerRadius(d) + this.cbOuterRadius(d)) / 2 - 4) * -1

  update(items: ItemModel) {
    const { c } = scale
    const { getMenu: menu } = items

    const arcGenerator = d3.arc()
      .innerRadius(this.cbInnerRadius)
      .outerRadius(this.cbOuterRadius)
      .startAngle(this.cbStartAngle)
      .endAngle(this.cbEndAngle)

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


    const texts = this.group.selectAll('.arc-text')
      .data(items.getMenu, (d: any) => d.name)

    texts.exit().remove();

    texts
      .transition().duration(750)
      .tween('text', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-angle'), d.orders);
        return (t: any) => d3.select(this).text(Math.floor(i(t)));
      })
      .attrTween('transform', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-angle'), d.orders);

        const rotation = (orders: number) => (scale.r(0) + scale.r(orders)) / 2
        return (t: any) => `rotate(${rotation(i(t))})`;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-angle', d.orders);
      })

    texts.enter().append('text')
      .attr('class', 'arc-text')
      .style('font-size', '16px')
      .style('font-family', 'Arial')
      .attr('text-anchor', 'middle')
      .attr('dy', this.cbTextPosition)
      .transition().duration(750)
      .tween('text', function(d: any) {
        const i = d3.interpolate(0, d.orders);
        return (t: any) => d3.select(this).text(Math.floor(i(t)));
      })
      .attrTween('transform', (d: any) => {
        const i = d3.interpolate(0, d.orders);
        return (t: any) => `rotate(${(this.cbMiddleAngleTween(i(t)) * 180 / Math.PI)})`;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-angle', d.orders);
      })


    this.group.attr('transform', `translate(300, 300)`)
  }

  polarToCartesian(radius: number, angle: number): [number, number] {
    return [
      radius * Math.cos(angle - Math.PI / 2),
      radius * Math.sin(angle - Math.PI / 2)
    ];
  }
}
