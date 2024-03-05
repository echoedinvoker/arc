import { config } from ".";
import { ScaleGenerator } from "./ScaleGenerator";
import * as d3 from 'd3';

export function createArcAxis(scaleGenerator: ScaleGenerator) {
  return (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => {
    const startAngle = scaleGenerator.r.range().at(0)! * Math.PI / 180; // 轉換為弧度
    const endAngle = scaleGenerator.r.range().at(-1)! * Math.PI / 180; // 轉換為弧度

    const radius = scaleGenerator.x.range()[0];

    const arc: d3.Arc<unknown, d3.DefaultArcObject> = d3.arc()
      .innerRadius(radius - config.arc.strokeWidth)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(endAngle);

    selection.append('path')
      .attr('d', arc as any)
  };
}
