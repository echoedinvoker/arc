export declare class Item {
    name: string;
    orders: number;
    color?: string | undefined;
    id?: string | number | undefined;
    constructor(name: string, orders: number, color?: string | undefined, id?: string | number | undefined);
}
export declare class ItemModel {
    private menuMap;
    constructor(data?: {
        name: string;
        orders: number;
        color?: string;
    }[], id?: string[]);
    get getMenu(): IterableIterator<Item>;
    get getMax(): number;
    get getNames(): string[];
    set(data: {
        name: string;
        orders: number;
        color?: string;
    }, id: string): void;
    remove(id: string): void;
    getItem(id: string): Item | undefined;
}
