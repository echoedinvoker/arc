import * as d3 from 'd3';
import { ScaleGenerator } from './ScaleGenerator';
import { Config } from './index';
export declare function createRadialAxis(scale: ScaleGenerator, radius: number, config: Config): (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) => void;
