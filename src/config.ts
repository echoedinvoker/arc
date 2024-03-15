
export const config = {
  fieldsId: 'name',
  fieldsName: 'name',
  fieldsValue: 'value',
  xOffSet: 0,
  yOffSet: 0,
  radialLength: 300,
  radialStrokeWidth: 1,
  radialStrokeColor: 'black',
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
  arcStrokeColor: 'black',
  arcFillOpacity: 0.7,
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
  xOffSet: number
  yOffSet: number
  radialLength: number
  radialStrokeWidth: number
  radialStrokeColor: string
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
  arcStrokeColor: string
  arcFillOpacity: number
  arcTextSize: number
  arcTextFamily: string
  arcTextColor: string
  eventHandlerEvent: string
  eventHandlerHandler: (d: any) => void
  animationDuration: number
}
