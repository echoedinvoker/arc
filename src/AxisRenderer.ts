import * as d3 from 'd3';
import { createRadialAxis } from './axisRadias';
import { ScaleGenerator } from './ScaleGenerator';
import { createArcAxis } from './axisArc';


export class AxisRenderer {
  radialAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
  arcAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
  namesAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
  scales: ScaleGenerator;

  constructor(
    private arcAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    private namesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    scales: ScaleGenerator,
    radius: number,
  ) {
    this.scales = scales;
    this.radialAxis = createRadialAxis(scales, radius);
    this.arcAxis = createArcAxis(scales);
    this.namesAxis = d3.axisBottom(scales.x)

  }

  update() {
    this.arcAxisGroup
      .call(this.radialAxis)
      .call(this.arcAxis)
      .attr('transform', `translate(300, 300)`);
    this.namesGroup
      .call(this.namesAxis)
      .attr('transform', `translate(${300 - this.scales.x.range().at(0)!}, 300)`);
    this.namesGroup.selectAll('text')
      .attr('transform', `rotate(-45)`)
      .attr('text-anchor', 'end')
  }
}
