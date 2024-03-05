import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

const config = {
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
  selector: string
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

class Polar {
  private config: Config
  private scale: ScaleGenerator
  private itemModel: ItemModel
  private axisRenderer: AxisRenderer
  private arcBarRenderer: ArcBarRenderer
  constructor(customConfig?: Partial<Config>) {
    this.config = { ...config, ...customConfig }
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


  async update() {
    const data: Array<{ name: string, orders: number, color?: string }> = (await d3.json('demo.json'))!
    data.forEach((d: any) => this.itemModel.set(d, d.name))
    this.scale.update(this.itemModel)
    this.axisRenderer.update()
    this.arcBarRenderer.update(this.itemModel)
  }
}

export { Polar }
