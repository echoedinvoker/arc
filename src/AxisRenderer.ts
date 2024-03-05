import * as d3 from 'd3';
import { createRadialAxis } from './axisRadias';
import { createArcAxis } from './axisArc';
import { config, itemModel, scale } from '.';


export class AxisRenderer {
  radialAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
  arcAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;

  constructor(
    private arcAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    private namesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    radius: number,
  ) {
    this.radialAxis = createRadialAxis(scale, radius);
    this.arcAxis = createArcAxis(scale);
  }

  update() {
    const scaleXCopied = scale.x.copy();
    scaleXCopied.domain(scale.x.domain().slice().reverse());
    const namesAxis = d3.axisBottom(scaleXCopied)

    this.arcAxisGroup
      .call(this.radialAxis)
      .call(this.arcAxis)
      .attr('transform', `translate(${config.radial.length}, ${config.radial.length})`)
    this.arcAxisGroup.selectAll('text')
      .attr('font-size', config.radial.text.size)
      .attr('font-family', config.radial.text.family)
      .attr('fill', config.radial.text.color)
    this.namesGroup
      .call(namesAxis)
      .attr('transform', `translate(${config.radial.length - scale.x.range().at(0)!}, ${config.radial.length})`);
    this.namesGroup.selectAll('text')
      .attr('transform', `rotate(-45)`)
      .attr('text-anchor', 'end')
      .attr('font-size', config.x.text.size)
      .attr('font-family', config.x.text.family)
      .attr('fill', config.x.text.color)
      .style('cursor', 'pointer')

    this.namesGroup.selectAll('text')
      .on(config.eventHandler.event, (_, d) => {
        config.eventHandler.handler(Array.from(itemModel.getMenu).find((item) => item.name === d)!)
      })
  }
}
