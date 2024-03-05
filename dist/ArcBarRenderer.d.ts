import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { Config } from './index';
export declare class ArcBarRenderer {
    private group;
    private config;
    private scale;
    private remMax;
    constructor(group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>, config: Config, scale: ScaleGenerator);
    cbStartAngle: () => number;
    cbEndAngle: (d: any) => number;
    cbEndAngleTween: (orders: number) => number;
    cbMiddleAngle: (d: any) => number;
    cbMiddleAngleTween: (orders: number) => number;
    cbInnerRadius: (d: any) => number;
    cbOuterRadius: (d: any) => number;
    cbTextPosition: (d: any) => number;
    update(items: ItemModel): void;
    polarToCartesian(radius: number, angle: number): [number, number];
}
