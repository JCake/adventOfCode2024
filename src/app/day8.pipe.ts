import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day8',
  standalone: true
})
export class Day8Pipe implements PipeTransform {

  transform(value: string): Solution {
    let grid = value.split(/\n/).map(row => row.trim().split(''));
    let antennas = new Map();
    for(let ri = 0; ri < grid.length; ri++){
      const row = grid[ri];
      for(let ci = 0; ci < grid[ri].length; ci++){
        if(row[ci].match(/[0-9a-zA-Z]/)){
          const antennaList = antennas.get(row[ci]) || [];
          antennaList.push({r: ri, c: ci});
          antennas.set(row[ci], antennaList);
        }
      }
    }
    const antiNodes = new Set();
    const part2AntiNodes = new Set();
    [...antennas.values()].forEach((as) => {
      for(let a = 0; a < as.length; a++){
        for(let a2 = a + 1; a2 < as.length; a2++){
          const spot1 = as[a];
          const spot2 = as[a2];
          part2AntiNodes.add(`${spot1.r},${spot1.c}`);
          part2AntiNodes.add(`${spot2.r},${spot2.c}`);
          const diffFrom1To2R = spot1.r - spot2.r;
          const diffFrom1To2C = spot1.c - spot2.c;
          const potentialAntiNode1 = {r: spot1.r + diffFrom1To2R, c: spot1.c + diffFrom1To2C};
          if(this.withinGrid(potentialAntiNode1.r, potentialAntiNode1.c, grid)) {
            antiNodes.add(`${potentialAntiNode1.r},${potentialAntiNode1.c}`);
            part2AntiNodes.add(`${potentialAntiNode1.r},${potentialAntiNode1.c}`);
            while(this.withinGrid(potentialAntiNode1.r + diffFrom1To2R, potentialAntiNode1.c + diffFrom1To2C, grid)){
              part2AntiNodes.add(`${potentialAntiNode1.r + diffFrom1To2R},${potentialAntiNode1.c + diffFrom1To2C}`);
              potentialAntiNode1.r = potentialAntiNode1.r + diffFrom1To2R;
              potentialAntiNode1.c = potentialAntiNode1.c + diffFrom1To2R;
            }
          }
          const potentialAntiNode2 = {r: spot2.r - diffFrom1To2R, c: spot2.c - diffFrom1To2C};
          if(this.withinGrid(potentialAntiNode2.r, potentialAntiNode2.c, grid)){
            antiNodes.add(`${potentialAntiNode2.r},${potentialAntiNode2.c}`);
            part2AntiNodes.add(`${potentialAntiNode2.r},${potentialAntiNode2.c}`);
          }
          while(this.withinGrid(potentialAntiNode2.r - diffFrom1To2R, potentialAntiNode2.c - diffFrom1To2C, grid)){
            part2AntiNodes.add(`${potentialAntiNode2.r - diffFrom1To2R},${potentialAntiNode2.c - diffFrom1To2C}`);
            potentialAntiNode2.r = potentialAntiNode2.r - diffFrom1To2R;
            potentialAntiNode2.c = potentialAntiNode2.c - diffFrom1To2R;
          }
        }
      }
    })
    return {part1: `${antiNodes.size}`, part2: `${part2AntiNodes.size}`};
  }

  private withinGrid(r: number, c: number, grid: string[][]): boolean {
    return r < grid.length && c < grid[0].length && r >= 0 && c >= 0;
  }

}
