import * as d3 from 'd3';
import { ItemModel } from './ItemModel';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { listenDishes } from './listenDishes';
import { ScaleGenerator } from './ScaleGenerator';
import { AxisRenderer } from './AxisRenderer';
import { ArcBarRenderer } from './ArcBarRenderer';

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

const config = {
  svg: { width: 600, height: 600 },
  margin: { top: 100, right: 20, bottom: 20, left: 100 },
  radialLength: 300,
  arcLength: 250,
  arcRange: [270, 330, 360]

}

const svg = d3.select('.canvas').append('svg')
  .attr('width', config.svg.width)
  .attr('height', config.svg.height);

const group = svg.append('g')
  .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)
  .attr('width', config.svg.width - config.margin.left - config.margin.right)
  .attr('height', config.svg.height - config.margin.top - config.margin.bottom);

export const scale = new ScaleGenerator(config.arcRange, config.arcLength)
export const itemModel = new ItemModel()
export const axisRenderer = new AxisRenderer(
  group.append('g'),
  group.append('g'),
  config.radialLength,
)
export const arcBarRenderer = new ArcBarRenderer(
  group.append('g'),
)

listenDishes(db)
