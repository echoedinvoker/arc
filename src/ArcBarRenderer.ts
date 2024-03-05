import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { Config } from './Polar';

export class ArcBarRenderer {
  constructor(
    private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    private config: Config,
    private scale: ScaleGenerator
  ) {

  }

  cbStartAngle = () => this.scale.r(0) * Math.PI / 180
  cbEndAngle = (d: any) => this.scale.r(d.orders) * Math.PI / 180
  cbEndAngleTween = (orders: number) => this.scale.r(orders) * Math.PI / 180
  cbMiddleAngle = (d: any) => (this.cbStartAngle() + this.cbEndAngle(d)) / 2
  cbMiddleAngleTween = (orders: number) => (this.cbStartAngle() + this.cbEndAngleTween(orders)) / 2
  cbInnerRadius = (d: any) => this.scale.x(d.name)!
  cbOuterRadius = (d: any) => this.scale.x(d.name)! + this.scale.x.bandwidth()
  cbTextPosition = (d: any) => ((this.cbInnerRadius(d) + this.cbOuterRadius(d)) / 2 - this.config.arc.text.size * 0.4) * -1

  update(items: ItemModel) {
    const { r, c } = this.scale
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
      .transition().duration(this.config.animation.duration)
      .attrTween('d', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-d'), d.orders)
        return (t: any) => arcGenerator({ ...d, orders: i(t) })!;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-d', d.orders);
      })

    arcs.enter().append('path')
      .attr('class', 'arc')
      .attr('fill', d => d?.color || c(d.name))
      .style('cursor', 'pointer')
      .on(this.config.eventHandler.event, (_, d) => {
        this.config.eventHandler.handler(d)
      })
      .transition().duration(this.config.animation.duration)
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
      .transition().duration(this.config.animation.duration)
      .tween('text', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-angle'), d.orders);
        return (t: any) => d3.select(this).text(Math.floor(i(t)));
      })
      .attrTween('transform', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-angle'), d.orders);

        const rotation = (orders: number) => (r(0) + r(orders)) / 2
        return (t: any) => `rotate(${rotation(i(t))})`;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-angle', d.orders);
      })

    texts.enter().append('text')
      .attr('class', 'arc-text')
      .style('font-size', this.config.arc.text.size)
      .style('font-family', this.config.arc.text.family)
      .style('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('dy', this.cbTextPosition)
      .attr('fill', this.config.arc.text.color)
      .transition().duration(this.config.animation.duration)
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


    this.group.attr('transform', `translate(${this.config.radial.length}, ${this.config.radial.length})`)
  }

  polarToCartesian(radius: number, angle: number): [number, number] {
    return [
      radius * Math.cos(angle - Math.PI / 2),
      radius * Math.sin(angle - Math.PI / 2)
    ];
  }
}
