import * as d3 from 'd3';
import { Polar } from './index';

export class Item {
  constructor(
    public name: string,
    public value: number,
    public color?: string,
    public id?: string | number
  ) { }
}

export class ItemModel {
  public menuMap: Map<string, Item>
  constructor(private polar: Polar, data: { name: string, value: number, color?: string }[] = [], id: string[] = []) {
    this.menuMap = new Map(data.map((d, i) => [id[i], d?.color ? new Item(d.name, d.value, d.color) : new Item(d.name, d.value)]))
  }

  get new() {
    return Array.from(this.menuMap.values());
  }

  set new(data: Item[]) {
    this.menuMap = new Map(data.map((d: any) => [d[this.polar.config.fieldsId], new Item(d.name, parseInt(d.value))]))
    this.polar.updateInstances()
  }

  get getMenu() {
    return this.menuMap.values();
  }

  get getMax() {
    return d3.max(this.getMenu, d => d.value) || 0;
  }

  get getNames() {
    return Array.from(this.getMenu).map(item => item.name);
  }

  set(data: { name: string, value: number, color?: string }, id: string) {
    this.menuMap.set(id, data?.color ? new Item(data.name, data.value, data.color) : new Item(data.name, data.value))
  }

  remove(id: string) {
    this.menuMap.delete(id)
  }

  getItem(id: string) {
    return this.menuMap.get(id)
  }
}
