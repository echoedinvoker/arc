import * as d3 from 'd3';
import { createRadialAxis } from './customAxisArc';
import { ScaleGenerator } from './ScaleGenerator';


export class AxisRenderer {
  rAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
  constructor(
    private rAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
    scales: ScaleGenerator,
    radius: number
  ) {
    this.rAxis = createRadialAxis(scales, radius);
  }

  update() {
    this.rAxisGroup.call(this.rAxis)
      .attr('transform', `translate(300, 300)`);
  }
}
