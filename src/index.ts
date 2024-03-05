import * as d3 from 'd3';
import _ from 'lodash';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

const config = {
  fields: {
    id: 'name',
    name: 'name',
    value: 'orders'
  },
  selector: '.canvas',
  svg: { width: 600, height: 600 },
  margin: { top: 100, right: 20, bottom: 20, left: 100 },
  radial: {
    length: 300,
    strokeWidth: 1,
    text: {
      size: 16,
      family: 'Arial',
      color: 'black',
      strokeDasharray: '5,5'
    }
  },
  x: {
    text: {
      size: 16,
      family: 'Arial',
      color: 'black',
    }
  },
  arc: {
    radius: 250,
    range: [270, 330, 360],
    strokeWidth: 0.5,
    text: {
      size: 16,
      family: 'Arial',
      color: 'black',
    }
  },
  eventHandler: {
    event: 'click',
    handler: (d: any) => console.log(d)
  },
  animation: {
    duration: 750
  }
}

export interface Config {
  fields: {
    id: string
    name: string
    value: string
  },
  selector: string | HTMLElement
  svg: { width: number, height: number }
  margin: { top: number, right: number, bottom: number, left: number }
  radial: {
    length: number,
    strokeWidth: number,
    text: {
      size: number,
      family: string,
      color: string,
      strokeDasharray: string
    }
  },
  x: {
    text: {
      size: number,
      family: string,
      color: string,
    }
  },
  arc: {
    radius: number,
    range: number[]
    strokeWidth: number,
    text: {
      size: number,
      family: string,
      color: string,
    }
  },
  eventHandler: {
    event: string,
    handler: (d: any) => void
  },
  animation: {
    duration: number
  }
}

export interface hasType {
  type: string
  [key: string]: any
}

export class Polar {
  private config: Config
  private scale: ScaleGenerator
  itemModel: ItemModel
  private axisRenderer: AxisRenderer
  private arcBarRenderer: ArcBarRenderer
  constructor(customConfig?: Partial<Config>) {
    // this.config = { ...config, ...customConfig }
    this.config = _.merge({}, config, customConfig)
    const svg = d3.select(config.selector).append('svg')
      .attr('width', config.svg.width)
      .attr('height', config.svg.height);

    const group = svg.append('g')
      .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)
      .attr('width', config.svg.width - config.margin.left - config.margin.right)
      .attr('height', config.svg.height - config.margin.top - config.margin.bottom);

    this.scale = new ScaleGenerator(config.arc.range, config.arc.radius)
    this.itemModel = new ItemModel()
    this.axisRenderer = new AxisRenderer(
      group.append('g'),
      group.append('g'),
      config.radial.length,
      this.config,
      this.itemModel,
      this.scale
    )
    this.arcBarRenderer = new ArcBarRenderer(
      group.append('g'),
      this.config,
      this.scale,
    )
  }


  update(data: hasType[]) {
    data.forEach((d) => {
      if (!(this.config.fields.id in d) && !(this.config.fields.name in d) && !(this.config.fields.value in d)) {
        console.error(`Invalid data: ${JSON.stringify(d)}`)
        return
      }
      const entity = {
        id: d[this.config.fields.id],
        name: d[this.config.fields.name],
        orders: d[this.config.fields.value]
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
const polar = new Polar()

d3.select('#added').on('click', () => {
  const name = d3.select('#name').property('value')
  const orders = d3.select('#orders').property('value')
  polar.update([{ type: 'added', name, orders }])
})

d3.select('#updated').on('click', () => {
  const name = d3.select('#name').property('value')
  const orders = d3.select('#orders').property('value')
  polar.update([{ type: 'modified', name, orders }])
})

d3.select('#removed').on('click', () => {
  const name = d3.select('#name').property('value')
  polar.update([{ type: 'removed', name }])
})
