import * as d3 from 'd3';

export class Item {
  constructor(
    public name: string,
    public orders: number
  ) { }
}

export class ItemModel {
  private menuMap: Map<string, Item>

  constructor(data: { name: string, orders: number }[] = [], id: string[] = []) {
    this.menuMap = new Map(data.map((d, i) => [id[i], new Item(d.name, d.orders)]));

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

  set(data: { name: string, orders: number }, id: string) {
    this.menuMap.set(id, new Item(data.name, data.orders))
  }

  remove(id: string) {
    this.menuMap.delete(id)
  }

  getItem(id: string) {
    return this.menuMap.get(id)
  }
}
