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
      .attr('transform', `translate(300, 300)`);
    this.namesGroup
      .call(namesAxis)
      .attr('transform', `translate(${300 - scale.x.range().at(0)!}, 300)`);
    this.namesGroup.selectAll('text')
      .attr('transform', `rotate(-45)`)
      .attr('text-anchor', 'end')
      .attr('font-size', '16px')
      .attr('font-family', 'Arial')

    this.namesGroup.selectAll('text')
      .on(config.eventHandler.event, (_, d) => {
        config.eventHandler.handler(Array.from(itemModel.getMenu).find((item) => item.name === d)!)
      })
  }
}
