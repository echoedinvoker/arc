Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.arcBarRenderer = exports.axisRenderer = exports.itemModel = exports.scale = exports.config = void 0;
const tslib_1 = require("tslib");
const d3 = tslib_1.__importStar(require("d3"));
const ItemModel_1 = require("./ItemModel");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const ScaleGenerator_1 = require("./ScaleGenerator");
const AxisRenderer_1 = require("./AxisRenderer");
const ArcBarRenderer_1 = require("./ArcBarRenderer");
// firebase for demo --
const listenDishes_1 = require("./listenDishes");
const firebaseConfig = {
    apiKey: "AIzaSyC4bKkedi8uLGBLokr7oZ_txm80qCCaE4I",
    authDomain: "udemy-d3-b699d.firebaseapp.com",
    projectId: "udemy-d3-b699d",
    storageBucket: "udemy-d3-b699d.appspot.com",
    messagingSenderId: "852464180558",
    appId: "1:852464180558:web:1c8a940b865dbab68d521f"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
// -- firebase for demo
exports.config = {
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
        handler: (d) => console.log(d)
    },
    animation: {
        duration: 750
    }
};
const svg = d3.select('.canvas').append('svg')
    .attr('width', exports.config.svg.width)
    .attr('height', exports.config.svg.height);
const group = svg.append('g')
    .attr('transform', `translate(${exports.config.margin.left}, ${exports.config.margin.top})`)
    .attr('width', exports.config.svg.width - exports.config.margin.left - exports.config.margin.right)
    .attr('height', exports.config.svg.height - exports.config.margin.top - exports.config.margin.bottom);
exports.scale = new ScaleGenerator_1.ScaleGenerator(exports.config.arc.range, exports.config.arc.radius);
exports.itemModel = new ItemModel_1.ItemModel();
exports.axisRenderer = new AxisRenderer_1.AxisRenderer(group.append('g'), group.append('g'), exports.config.radial.length);
exports.arcBarRenderer = new ArcBarRenderer_1.ArcBarRenderer(group.append('g'));
// firebase for demo --
function update() {
    exports.scale.update(exports.itemModel);
    exports.axisRenderer.update();
    exports.arcBarRenderer.update(exports.itemModel);
}
exports.update = update;
(0, listenDishes_1.listenDishes)(db);
// -- firebase for demo
