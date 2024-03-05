import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

// firebase for demo --
import { listenDishes } from './listenDishes';
const firebaseConfig = {
  apiKey: "AIzaSyC4bKkedi8uLGBLokr7oZ_txm80qCCaE4I",
  authDomain: "udemy-d3-b699d.firebaseapp.com",
  projectId: "udemy-d3-b699d",
  storageBucket: "udemy-d3-b699d.appspot.com",
  messagingSenderId: "852464180558",
  appId: "1:852464180558:web:1c8a940b865dbab68d521f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// -- firebase for demo

export const config = {
  svg: { width: 600, height: 600 },
  margin: { top: 100, right: 20, bottom: 20, left: 100 },
  radial: {
    length: 300,
    text: {
      size: 16,
      family: 'Arial',
      color: 'black'
    }
  },
  x: {
    text: {
      size: 16,
      family: 'Arial',
      color: 'black'
    }
  },
  arc: {
    radius: 250,
    range: [270, 330, 360],
    text: {
      size: 16,
      family: 'Arial',
      color: 'black'
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

const svg = d3.select('.canvas').append('svg')
  .attr('width', config.svg.width)
  .attr('height', config.svg.height);

const group = svg.append('g')
  .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)
  .attr('width', config.svg.width - config.margin.left - config.margin.right)
  .attr('height', config.svg.height - config.margin.top - config.margin.bottom);

export const scale = new ScaleGenerator(config.arc.range, config.arc.radius)
export const itemModel = new ItemModel()
export const axisRenderer = new AxisRenderer(
  group.append('g'),
  group.append('g'),
  config.radial.length,
)
export const arcBarRenderer = new ArcBarRenderer(
  group.append('g'),
)

// firebase for demo --
export function update() {
  scale.update(itemModel)
  axisRenderer.update()
  arcBarRenderer.update(itemModel)
}
listenDishes(db)
// -- firebase for demo
