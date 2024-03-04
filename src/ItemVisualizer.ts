import * as d3 from 'd3';
import { ItemModel } from "./ItemModel";
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

export class ItemVisualizer {
  private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
  private scale: ScaleGenerator;
  private axisRenderer: AxisRenderer;
  private arcBarRenderer: ArcBarRenderer;
  constructor(
    target: { selector: string, width: number, height: number },
    margin: { top: number, right: number, bottom: number, left: number },
    private ranges: number[],
    private radius: number,

  ) {

    const svg = d3.select(target.selector).append('svg')
      .attr('width', target.width)
      .attr('height', target.height);

    this.group = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('width', target.width - margin.left - margin.right)
      .attr('height', target.height - margin.top - margin.bottom);

    this.scale = new ScaleGenerator(this.ranges, this.radius * 0.8);
    this.axisRenderer = new AxisRenderer(
      this.group.append('g'),
      this.group.append('g'),
      this.scale,
      this.radius
    )
    this.arcBarRenderer = new ArcBarRenderer(
      this.group.append('g'),
      this.scale,
    )

  }
  update(items: ItemModel) {
    this.scale.update(items)
    this.axisRenderer.update()
    this.arcBarRenderer.update(items)
  }
}
