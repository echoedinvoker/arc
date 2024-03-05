import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { Config } from './index';

export class ArcBarRenderer {
  private remMax: number;
  constructor(
    private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    private config: Config,
    private scale: ScaleGenerator,
  ) {
    this.remMax = 0
  }

  cbStartAngle = () => this.scale.r(0) * Math.PI / 180
  cbEndAngle = (d: any) => this.scale.r(d.orders) * Math.PI / 180
  cbEndAngleTween = (orders: number) => this.scale.r(orders) * Math.PI / 180
  cbMiddleAngle = (d: any) => (this.cbStartAngle() + this.cbEndAngle(d)) / 2
  cbMiddleAngleTween = (orders: number) => (this.cbStartAngle() + this.cbEndAngleTween(orders)) / 2
  cbInnerRadius = (d: any) => this.scale.x(d.name)!
  cbOuterRadius = (d: any) => this.scale.x(d.name)! + this.scale.x.bandwidth()
  cbTextPosition = (d: any) => ((this.cbInnerRadius(d) + this.cbOuterRadius(d)) / 2 - this.config.arcTextSize * 0.4) * -1

  update(items: ItemModel) {
    const { r, c } = this.scale
    const { getMenu: menu, getMax: max } = items
    const adjustRatio = this.remMax ? max / this.remMax : 1
    this.remMax = max

    const arcGenerator = d3.arc()
      .innerRadius(this.cbInnerRadius)
      .outerRadius(this.cbOuterRadius)
      .startAngle(this.cbStartAngle)
      .endAngle(this.cbEndAngle)

    const arcs = this.group.selectAll('.arc')
      .data(menu, (d: any) => d.name)

    arcs.exit().remove();

    arcs
      .transition().duration(this.config.animationDuration)
      .attrTween('d', function(d: any) {
        const previousOrders = d3.select(this).attr('data-prev-d')
        const i: Function = d3.interpolate(
          previousOrders ? parseInt(previousOrders) * adjustRatio : 0,
          d.orders
        )
        return (t: any) => arcGenerator({ ...d, orders: i(t) })!;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-d', d.orders);
      })

    arcs.enter().append('path')
      .attr('class', 'arc')
      .attr('fill', d => d?.color || c(d.name))
      .style('cursor', 'pointer')
      .on(this.config.eventHandlerEvent, (_, d) => {
        this.config.eventHandlerHandler(d)
      })
      .transition().duration(this.config.animationDuration)
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
      .attr('dy', this.cbTextPosition)
      .transition().duration(this.config.animationDuration)
      .tween('text', function(d: any) {
        const i: Function = d3.interpolate(d3.select(this).attr('data-prev-angle'), d.orders);
        return (t: any) => d3.select(this).text(Math.floor(i(t)));
      })
      .attrTween('transform', function(d: any) {
        const previousOrders = d3.select(this).attr('data-prev-angle')
        const i: Function = d3.interpolate(
          previousOrders ? parseInt(previousOrders) * adjustRatio : 0,
          d.orders
        );
        const rotation = (orders: number) => (r(0) + r(orders)) / 2
        return (t: any) => `rotate(${rotation(i(t))})`;
      })
      .on('end', function(d: any) {
        d3.select(this).attr('data-prev-angle', d.orders);
      })

    texts.enter().append('text')
      .attr('class', 'arc-text')
      .style('font-size', this.config.arcTextSize)
      .style('font-family', this.config.arcTextFamily)
      .style('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('dy', this.cbTextPosition)
      .attr('fill', this.config.arcTextColor)
      .transition().duration(this.config.animationDuration)
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


    this.group.attr('transform', `translate(${this.config.radialLength}, ${this.config.radialLength})`)
  }

  polarToCartesian(radius: number, angle: number): [number, number] {
    return [
      radius * Math.cos(angle - Math.PI / 2),
      radius * Math.sin(angle - Math.PI / 2)
    ];
  }
}

