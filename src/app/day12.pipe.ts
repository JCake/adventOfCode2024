import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

class Perimeters {
  perimeters: Map<string,number> = new Map();
  part2Squares: Map<string,boolean[][]> = new Map();

  part2Perimeter(input: string): number {
    const map = this.part2Squares.get(input);
    if(!map){
      console.log('0');
      return 0;
    }
    let count = 0;
    let current = false;
    for(let ci = 0; ci < map[0].length; ci++){
      const newCurrent = map[0][ci];
      if(current && !newCurrent){
        count++;
      }
      current = newCurrent;
    }
    if(current){
      count++;
    }
    current = false;
    for(let ci = 0; ci < map[0].length; ci++){
      const newCurrent = map[map.length - 1][ci];
      if(current && !newCurrent){
        count++;
      }
      current = newCurrent;
    }
    if(current){
      count++;
    }
    for(let ri = 0; ri < map.length - 1; ri++){
      let below = false;
      let middle = false;
      for(let ci = 0; ci < map[ri].length; ci++){
        const newBelow = map[ri+1][ci];
        const newMiddle = map[ri][ci];
        if(middle && !below){
          if(!newMiddle || newBelow){
            count++;
          }
        } else if(below && !middle){
          if(newMiddle || !newBelow){
            count++;
          }
        }
        middle = newMiddle;
        below = newBelow;
      }
      if((middle && !below) || (below && !middle)){
        count++;
      }
    }

    current = false;
    for(let ri = 0; ri < map.length; ri++){
      const newCurrent = map[ri][0];
      if(current && !newCurrent){
        count++;
      }
      current = newCurrent;
    }
    if(current){
      count++;
    }
    current = false;
    for(let ri = 0; ri < map.length; ri++){
      const newCurrent = map[ri][map[ri].length - 1];
      if(current && !newCurrent){
        count++;
      }
      current = newCurrent;
    }
    if(current){
      count++;
    }
    for(let ci = 0; ci < map[0].length - 1; ci++){
      let right = false;
      let middle = false;
      for(let ri = 0; ri < map.length; ri++){
        const newRight = map[ri][ci+1];
        const newMiddle = map[ri][ci];
        if(middle && !right){
          if(!newMiddle || newRight){
            count++;
          }
        } else if(!middle && right){
          if(newMiddle || !newRight){
            count++;
          }
        }
        middle = newMiddle;
        right = newRight;
      }
      if((middle && !right) || (right && !middle)){
        count++;
      }
    }

    return count;
  }

  reset(input: string, grid: string[][]): void {
    this.perimeters.set(input,0);
    const squares = [];
    for(let ri = 0; ri < grid.length; ri++){
      const row = [];
      for(let ci = 0; ci < grid[ri].length; ci++){
        row.push(false);
      }
      squares.push(row);
    }
    this.part2Squares.set(input, squares)
  }
}

@Pipe({
  name: 'day12',
  standalone: true
})
export class Day12Pipe implements PipeTransform {

  transform(input: string): Solution {
    const grid = input.split('\n').map(r => r.split(''));
    let areas: Map<string,number> = new Map();
    let p: Perimeters = new Perimeters();
    let counted: Set<string> = new Set();
    let cost = 0;
    let discountedCost = 0;
    for(let ri = 0; ri < grid.length; ri++){
      for(let ci = 0; ci < grid[ri].length; ci++){
        const plotType = grid[ri][ci];
        if(!counted.has(`${ri},${ci}`) && areas.get(plotType)){
          cost += (Number(areas.get(plotType)) * Number(p.perimeters.get(plotType)));
          discountedCost += (Number(areas.get(plotType)) * Number(p.part2Perimeter(plotType)));
          areas.set(plotType, 0);
          p.reset(plotType, grid);
        }
        this.checkSpot(counted, ri, ci, areas, plotType, p, grid);
      }
    }
    
    areas.forEach((area, type) => {
      cost += (area * Number(p.perimeters.get(type)));
      discountedCost += (area * Number(p.part2Perimeter(type)));
    })
    return {part1: `${cost}`, part2: `${discountedCost}`};
  }


  private checkSpot(counted: Set<string>, ri: number, ci: number, areas: Map<string, number>, plotType: string, p: Perimeters, grid: string[][]) {
    if(grid[ri][ci] !== plotType || counted.has(`${ri},${ci}`)){
      return;
    }
    if (!areas.has(plotType)) {
      areas.set(plotType, 0);
      p.reset(plotType, grid);  
    }
    counted.add(`${ri},${ci}`);
    (p.part2Squares.get(plotType) as boolean[][])[ri][ci] = true;
    areas.set(plotType, areas.get(plotType) as number + 1);
    if (ri === 0 || grid[ri - 1][ci] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri - 1, ci, areas, plotType, p, grid);
    }
    if (ci === 0 || grid[ri][ci - 1] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri, ci - 1, areas, plotType, p, grid);
    }
    if (ri === grid.length - 1 || grid[ri + 1][ci] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri + 1, ci, areas, plotType, p, grid);
    }
    if (ci === grid[ri].length - 1 || grid[ri][ci + 1] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
    } else {
      this.checkSpot(counted, ri, ci + 1, areas, plotType, p, grid);
    }
  }
}
