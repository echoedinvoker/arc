# Install
```terminal
npm i polar-d3
```

# Setup
```typescript
import { Polar } from 'polar-d3';

const polar = new Polar();
```
# Add, Update, Remove data
```typescript
polar.update([
  { type: 'added', name: 'A', orders: 10 },
  { type: 'modified', name: 'A', orders: 20 },
  { type: 'removed', name: 'A' },
]);
```
# Configuration
```typescript
polar.changeCinfig({ svgWidth: 200, svgHeight: 200 })
```
You can also pass configuration when initializing a `Polar` instance.
```typescript
new Polar({ svgWidth: 200, svgHeight: 200 });
```
Other configuration properties:
```typescript
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
```
