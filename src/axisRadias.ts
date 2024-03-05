import * as d3 from 'd3';
import { ScaleGenerator } from './ScaleGenerator';
import { Config } from './Polar';

export function createRadialAxis(scale: ScaleGenerator, radius: number, config: Config): (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) => void {
  return function(g) {
    g.selectAll('line').remove();
    g.selectAll('text').remove();
    const ticks = scale.r.ticks(10);

    ticks.forEach(tick => {
      const angle = (scale.r(tick) * Math.PI) / 180;
      const end = polarToCartesian(radius, angle);

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', end.x)
        .attr('y2', end.y)
        .style('stroke', 'black')
        .style('stroke-width', config.radial.strokeWidth)
        .style('stroke-dasharray', config.radial.text.strokeDasharray);


      const textPosition = polarToCartesian(radius + 15, angle);
      const rotationAngle = angle * (180 / Math.PI);

      g.append('text')
        .attr('x', textPosition.x)
        .attr('y', textPosition.y)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(${rotationAngle + 90},${textPosition.x},${textPosition.y})`)
        .text(tick);
    });
  };
}

function polarToCartesian(radius: number, angle: number): { x: number, y: number } {
  return {
    x: radius * Math.cos(angle - Math.PI / 2),
    y: radius * Math.sin(angle - Math.PI / 2)
  };
}

