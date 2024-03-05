import { ItemModel } from './ItemModel';
export interface Config {
    fieldsId: string;
    fieldsName: string;
    fieldsValue: string;
    selector: string;
    svgWidth: number;
    svgHeight: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    radialLength: number;
    radialStrokeWidth: number;
    radialTextSize: number;
    radialTextFamily: string;
    radialTextColor: string;
    radialTextStrokeDasharray: string;
    xTextSize: number;
    xTextFamily: string;
    xTextColor: string;
    arcRadius: number;
    arcRange: number[];
    arcStrokeWidth: number;
    arcTextSize: number;
    arcTextFamily: string;
    arcTextColor: string;
    eventHandlerEvent: string;
    eventHandlerHandler: (d: any) => void;
    animationDuration: number;
}
export interface hasType {
    type: string;
    [key: string]: any;
}
export declare class Polar {
    private group;
    private config;
    private scale;
    itemModel: ItemModel;
    private axisRenderer;
    private arcBarRenderer;
    constructor(customConfig?: Partial<Config>);
    changeConfig(customConfig: Partial<Config>): void;
    update(data: hasType[]): void;
}
