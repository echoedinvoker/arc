import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

const config = {
  fieldsId: 'name',
  fieldsName: 'name',
  fieldsValue: 'orders',
  selector: '.canvas',
  svgWidth: 600,
  svgHeight: 600,
  marginTop: 100,
  marginRight: 20,
  marginBottom: 20,
  marginLeft: 100,
  radialLength: 300,
  radialStrokeWidth: 1,
  radialTextSize: 16,
  radialTextFamily: 'Arial',
  radialTextColor: 'black',
  radialTextStrokeDasharray: '5,5',
  xTextSize: 16,
  xTextFamily: 'Arial',
  xTextColor: 'black',
  arcRadius: 250,
  arcRange: [270, 330, 360],
  arcStrokeWidth: 0.5,
  arcTextSize: 16,
  arcTextFamily: 'Arial',
  arcTextColor: 'black',
  eventHandlerEvent: 'click',
  eventHandlerHandler: (d: any) => console.log(d),
  animationDuration: 750
}

export interface Config {
  fieldsId: string
  fieldsName: string
  fieldsValue: string
  selector: string
  svgWidth: number
  svgHeight: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  radialLength: number
  radialStrokeWidth: number
  radialTextSize: number
  radialTextFamily: string
  radialTextColor: string
  radialTextStrokeDasharray: string
  xTextSize: number
  xTextFamily: string
  xTextColor: string
  arcRadius: number
  arcRange: number[]
  arcStrokeWidth: number
  arcTextSize: number
  arcTextFamily: string
  arcTextColor: string
  eventHandlerEvent: string
  eventHandlerHandler: (d: any) => void
  animationDuration: number
}


export interface hasType {
  type: string
  [key: string]: any
}

export class Polar {
  private group: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>
  private config: Config
  private scale: ScaleGenerator
  itemModel: ItemModel
  private axisRenderer: AxisRenderer
  private arcBarRenderer: ArcBarRenderer
  constructor(customConfig?: Partial<Config>) {
    this.config = { ...config, ...customConfig }
    const svg = d3.select(this.config.selector).append('svg')
      .attr('width', this.config.svgWidth)
      .attr('height', this.config.svgHeight);

    this.group = svg.append('g')
      .attr('transform', `translate(${this.config.marginLeft / 2}, ${this.config.marginTop / 2})`)
      .attr('width', this.config.svgWidth - this.config.marginLeft - this.config.marginRight)
      .attr('height', this.config.svgHeight - this.config.marginTop - this.config.marginBottom);

    this.scale = new ScaleGenerator(
      this.config.arcRange,
      this.config.arcRadius
    )
    this.itemModel = new ItemModel()
    this.axisRenderer = new AxisRenderer(
      this.group.append('g'),
      this.group.append('g'),
      this.config.radialLength,
      this.config,
      this.itemModel,
      this.scale
    )
    this.arcBarRenderer = new ArcBarRenderer(
      this.group.append('g'),
      this.config,
      this.scale,
    )
  }

  changeConfig(customConfig: Partial<Config>) {
    this.config = { ...this.config, ...customConfig }
    const svg = d3.select(this.config.selector).append('svg')
      .attr('width', this.config.svgWidth)
      .attr('height', this.config.svgHeight);

    this.group = svg.append('g')
      .attr('transform', `translate(${this.config.marginLeft / 2}, ${this.config.marginTop / 2})`)
      .attr('width', this.config.svgWidth - this.config.marginLeft - this.config.marginRight)
      .attr('height', this.config.svgHeight - this.config.marginTop - this.config.marginBottom);

    this.scale = new ScaleGenerator(
      this.config.arcRange,
      this.config.arcRadius
    )
    this.itemModel = new ItemModel()
    this.axisRenderer = new AxisRenderer(
      this.group.append('g'),
      this.group.append('g'),
      this.config.radialLength,
      this.config,
      this.itemModel,
      this.scale
    )
    this.arcBarRenderer = new ArcBarRenderer(
      this.group.append('g'),
      this.config,
      this.scale,
    )
    this.scale.update(this.itemModel)
    this.axisRenderer.update()
    this.arcBarRenderer.update(this.itemModel)
  }


  update(data: hasType[]) {
    data.forEach((d) => {
      if (!(this.config.fieldsId in d) && !(this.config.fieldsName in d) && !(this.config.fieldsValue in d)) {
        console.error(`Invalid data: ${JSON.stringify(d)}`)
        return
      }
      const entity = {
        id: d[this.config.fieldsId],
        name: d[this.config.fieldsName],
        orders: d[this.config.fieldsValue]
      };
      switch (d.type) {
        case "added":
          this.itemModel.set(entity, entity.id)
          break;
        case "modified":
          const item = this.itemModel.getItem(entity.id)!
          item.orders = entity.orders
          break;
        case "removed":
          this.itemModel.remove(entity.id)
          break;
        default:
          console.log(`Unhandled type: ${d.type}`);
      }
    })
    this.scale.update(this.itemModel)
    this.axisRenderer.update()
    this.arcBarRenderer.update(this.itemModel)
  }
}


// testing
// const polar = new Polar()

// d3.select('#added').on('click', () => {
//   const name = d3.select('#name').property('value')
//   const orders = d3.select('#orders').property('value')
//   polar.update([{ type: 'added', name, orders }])
// })
//
// d3.select('#updated').on('click', () => {
//   const name = d3.select('#name').property('value')
//   const orders = d3.select('#orders').property('value')
//   polar.update([{ type: 'modified', name, orders }])
// })
//
// d3.select('#removed').on('click', () => {
//   const name = d3.select('#name').property('value')
//   polar.update([{ type: 'removed', name }])
// })
