import * as d3 from 'd3';
import { ScaleGenerator } from './ScaleGenerator';

export function createRadialAxis(scale: ScaleGenerator, radius: number): (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) => void {
  return function(g) {
    const ticks = scale.r.ticks(); // 獲取比例尺的刻度值
    console.log(scale.r.domain())

    ticks.forEach(tick => {
      const angle = (scale.r(tick) * Math.PI) / 180; // 將角度轉換為弧度
      // 使用極坐標轉換計算起點和終點
      const end = polarToCartesian(radius, angle);

      // 繪製每條刻度線
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', end.x)
        .attr('y2', end.y)
        .style('stroke', 'black');

      // 添加刻度标签
      const textPosition = polarToCartesian(radius + 15, angle); // 文本位于线段外侧
      // 计算文本的旋转角度，将弧度转换为度
      const rotationAngle = angle * (180 / Math.PI); // SVG旋转是逆时针，这里调整使0度在顶部

      g.append('text')
        .attr('x', textPosition.x)
        .attr('y', textPosition.y)
        .attr('dy', '.35em') // 垂直居中
        .attr('text-anchor', 'middle') // 水平居中
        .attr('transform', `rotate(${rotationAngle},${textPosition.x},${textPosition.y})`)
        .text(tick);
    });
  };
}

// 極坐標轉換為笛卡爾坐標
function polarToCartesian(radius: number, angle: number): { x: number, y: number } {
  return {
    x: radius * Math.cos(angle - Math.PI / 2), // 調整角度使0度在頂部
    y: radius * Math.sin(angle - Math.PI / 2)
  };
}

