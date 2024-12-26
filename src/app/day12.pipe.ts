import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day12',
  standalone: true
})
export class Day12Pipe implements PipeTransform {

  transform(input: string): Solution {
    const grid = input.split('\n').map(r => r.split(''));
    let areas: Map<string,number> = new Map();
    let perimeters: Map<string,number> = new Map();
    let counted: Set<string> = new Set();
    let cost = 0;
    for(let ri = 0; ri < grid.length; ri++){
      for(let ci = 0; ci < grid[ri].length; ci++){
        const plotType = grid[ri][ci];
        if(!counted.has(`${ri},${ci}`) && areas.get(plotType)){
          cost += (Number(areas.get(plotType)) * Number(perimeters.get(plotType)));
          areas.set(plotType, 0);
          perimeters.set(plotType, 0);
        }
        this.checkSpot(counted, ri, ci, areas, plotType, perimeters, grid);
      }
    }
    
    areas.forEach((area, type) => {
      cost += (area * Number(perimeters.get(type)));
    })
    return {part1: `${cost}`, part2: ''};
  }


  private checkSpot(counted: Set<string>, ri: number, ci: number, areas: Map<string, number>, plotType: string, perimeters: Map<string, number>, grid: string[][]) {
    if(grid[ri][ci] !== plotType || counted.has(`${ri},${ci}`)){
      return;
    }
    if (!areas.has(plotType)) {
      areas.set(plotType, 0);
      perimeters.set(plotType, 0);  
    }
    counted.add(`${ri},${ci}`);
    areas.set(plotType, areas.get(plotType) as number + 1);
    if (ri === 0 || grid[ri - 1][ci] !== plotType) {
      perimeters.set(plotType, perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri - 1, ci, areas, plotType, perimeters, grid);
    }
    if (ci === 0 || grid[ri][ci - 1] !== plotType) {
      perimeters.set(plotType, perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri, ci - 1, areas, plotType, perimeters, grid);
    }
    if (ri === grid.length - 1 || grid[ri + 1][ci] !== plotType) {
      perimeters.set(plotType, perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri + 1, ci, areas, plotType, perimeters, grid);
    }
    if (ci === grid[ri].length - 1 || grid[ri][ci + 1] !== plotType) {
      perimeters.set(plotType, perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri, ci + 1, areas, plotType, perimeters, grid);
    }
  }
}
