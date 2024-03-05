import { Config } from "./index";
import { ScaleGenerator } from "./ScaleGenerator";
import * as d3 from 'd3';
export declare function createArcAxis(scaleGenerator: ScaleGenerator, config: Config): (selection: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>) => void;
