import * as d3 from 'd3';
import { Config } from './index';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
export declare class AxisRenderer {
    private arcAxisGroup;
    private namesGroup;
    private config;
    private itemModel;
    private scale;
    radialAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
    arcAxis: (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
    constructor(arcAxisGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>, namesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>, radius: number, config: Config, itemModel: ItemModel, scale: ScaleGenerator);
    update(): void;
}
