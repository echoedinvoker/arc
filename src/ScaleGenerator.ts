import * as d3 from 'd3';
import { ItemModel } from './ItemModel';


export class ScaleGenerator {
  r: d3.ScaleLinear<number, number>;

  constructor(range: number[]) {
    this.r = d3.scaleLinear()
    this.r = d3.scalePow()
      .range(range)
  }

  update(items: ItemModel) {
    this.r.domain([0, items.getMax / 2, items.getMax])
  }
}
