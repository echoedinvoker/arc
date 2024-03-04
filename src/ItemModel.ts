import * as d3 from 'd3';

export class Item {
  constructor(public name: string, public orders: number) { }
}

export class ItemModel {
  private menuMap: Map<string, Item>

  constructor(data: any) {
    this.menuMap = new Map(data.map((d: any) => [d.name, new Item(d.name, d.orders)]));

  }

  get getMenu() {
    return this.menuMap.values();
  }

  get getMax() {
    return d3.max(this.getMenu, d => d.orders) || 0;
  }

  get getNames() {
    return Array.from(this.getMenu).map(item => item.name);
  }

  growTen(name: string) {
    this.menuMap.get(name)!.orders += 10;
  }
  pop() {
    const keys = this.menuMap.keys()
    this.menuMap.delete(keys.next().value);
  }
}
