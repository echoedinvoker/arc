
export const config = {
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
