export interface Config {
    fields: {
        id: string;
        name: string;
        value: string;
    };
    selector: string;
    svg: {
        width: number;
        height: number;
    };
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    radial: {
        length: number;
        strokeWidth: number;
        text: {
            size: number;
            family: string;
            color: string;
            strokeDasharray: string;
        };
    };
    x: {
        text: {
            size: number;
            family: string;
            color: string;
        };
    };
    arc: {
        radius: number;
        range: number[];
        strokeWidth: number;
        text: {
            size: number;
            family: string;
            color: string;
        };
    };
    eventHandler: {
        event: string;
        handler: (d: any) => void;
    };
    animation: {
        duration: number;
    };
}
interface hasType {
    type: string;
    [key: string]: any;
}
export declare class Polar {
    private config;
    private scale;
    private itemModel;
    private axisRenderer;
    private arcBarRenderer;
    constructor(customConfig?: Partial<Config>);
    update(data: hasType[]): void;
}
export {};
