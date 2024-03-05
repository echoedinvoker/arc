import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
export declare class ScaleGenerator {
    r: d3.ScaleLinear<number, number>;
    x: d3.ScaleBand<string>;
    c: d3.ScaleOrdinal<string, string>;
    constructor(range: number[], length: number);
    update(items: ItemModel): void;
}
