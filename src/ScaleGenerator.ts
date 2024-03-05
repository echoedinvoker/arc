import * as d3 from 'd3';
import { ItemModel } from './ItemModel';


export class ScaleGenerator {
  r: d3.ScaleLinear<number, number>;
  x: d3.ScaleBand<string>;
  c: d3.ScaleOrdinal<string, string>;

  constructor(range: number[], length: number) {
    this.r = d3.scaleLinear()
      .range(range)
    this.x = d3.scaleBand()
      .range([length, 0])
      .padding(0.1)
    this.c = d3.scaleOrdinal(d3.schemeCategory10)
  }

  update(items: ItemModel) {
    this.r.domain([0, items.getMax / 2, items.getMax])
    this.x.domain(items.getNames)
  }
}
