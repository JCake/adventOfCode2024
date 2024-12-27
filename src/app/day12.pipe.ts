import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

class Perimeters {
  perimeters: Map<string,number> = new Map();
  part2Perimeters: Map<string,number> = new Map();
  part2RPerimeters: Map<string,Set<number>> = new Map();
  part2CPerimeters: Map<string,Set<number>> = new Map();

  reset(input: string): void {
    this.perimeters.set(input,0);
    this.part2Perimeters.set(input,0);
    this.part2RPerimeters.set(input,new Set());
    this.part2CPerimeters.set(input,new Set());
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
          discountedCost += (Number(areas.get(plotType)) * Number(p.part2Perimeters.get(plotType)));
          areas.set(plotType, 0);
          p.reset(plotType);
        }
        this.checkSpot(counted, ri, ci, areas, plotType, p, grid);
      }
    }
    
    areas.forEach((area, type) => {
      cost += (area * Number(p.perimeters.get(type)));
      discountedCost += (area * Number(p.part2Perimeters.get(type)));
    })
    return {part1: `${cost}`, part2: `${discountedCost}`};
  }


  private checkSpot(counted: Set<string>, ri: number, ci: number, areas: Map<string, number>, plotType: string, p: Perimeters, grid: string[][]) {
    const rs = p.part2RPerimeters.get(plotType) || new Set();
    const cs = p.part2CPerimeters.get(plotType) || new Set();
    if(grid[ri][ci] !== plotType){
      rs.delete(ri);
      rs.delete(ri + 1);
      cs.delete(ci);
      cs.delete(ci + 1);
    } 
    else {
      if(ri > 0){
        if(grid[ri - 1][ci] === plotType){
          rs.delete(ri);
        }
        // if(ci > 0 && grid[ri-1][ci - 1] === plotType){
        //   rs.delete(ri);
        // }
        // if(ci < grid[ri-1].length - 1 && grid[ri-1][ci + 1] === plotType){
        //   rs.delete(ri);
        // }
      }
      if(ri < grid.length - 1){
        if(grid[ri+1][ci] === plotType){
          rs.delete(ri+1);
        }
        // if(ci > 0 && grid[ri + 1][ci - 1] === plotType){
        //   rs.delete(ri+1);
        // }
        // if(ci < grid[ri + 1].length - 1 && grid[ri + 1][ci + 1] === plotType){
        //   rs.delete(ri+1);
        // }
      }
      if(ci > 0){
        if(grid[ri][ci - 1] === plotType){
          cs.delete(ci);
        }
        // if(ri > 0 && grid[ri - 1][ci - 1] === plotType && grid[ri][ci] === plotType){
        //   rs.delete(ci);
        // }
        // if(ri < grid.length - 1 && grid[ri + 1][ci - 1] === plotType && grid[ri][ci] === plotType){
        //   rs.delete(ci);
        // }
      }
      if(ci < grid[ri].length - 1 ){
        // if(grid[ri][ci+1] === plotType){
        //   cs.delete(ci+1);
        // }
        if(ri > 0 && grid[ri - 1][ci + 1] === plotType){
          rs.delete(ci+1);
        }
        // if(ri < grid.length - 1 && grid[ri + 1][ci + 1] === plotType){
        //   rs.delete(ci+1);
        // }
      }
    }
    if(grid[ri][ci] !== plotType || counted.has(`${ri},${ci}`)){
      return;
    }
    if (!areas.has(plotType)) {
      areas.set(plotType, 0);
      p.reset(plotType);  
    }
    counted.add(`${ri},${ci}`);
    areas.set(plotType, areas.get(plotType) as number + 1);
    if (ri === 0 || grid[ri - 1][ci] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
      if(!rs.has(ri)){
        p.part2Perimeters.set(plotType, Number(p.part2Perimeters.get(plotType)) + 1)
        rs.add(ri);
        p.part2RPerimeters.set(plotType, rs);
      }
    } else {
      if(grid[ri - 1][ci] === plotType){
        rs.delete(ri);
      }
      this.checkSpot(counted, ri - 1, ci, areas, plotType, p, grid);
    }
    if (ci === 0 || grid[ri][ci - 1] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
      if(!cs.has(ci)){
        p.part2Perimeters.set(plotType, Number(p.part2Perimeters.get(plotType)) + 1)
        cs.add(ci);
        p.part2CPerimeters.set(plotType, cs);
      }
    } else {
      if(grid[ri][ci - 1] === plotType){
        cs.delete(ci);
      }
      this.checkSpot(counted, ri, ci - 1, areas, plotType, p, grid);
    }
    if (ri === grid.length - 1 || grid[ri + 1][ci] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
      if(!rs.has(ri + 1)){
        p.part2Perimeters.set(plotType, Number(p.part2Perimeters.get(plotType)) + 1)
        rs.add(ri + 1);
        p.part2RPerimeters.set(plotType, rs);
      }
    } else {
      if(grid[ri + 1][ci] === plotType){
        rs.delete(ri + 1);
      }
      this.checkSpot(counted, ri + 1, ci, areas, plotType, p, grid);
    }
    if (ci === grid[ri].length - 1 || grid[ri][ci + 1] !== plotType) {
      p.perimeters.set(plotType, p.perimeters.get(plotType) as number + 1);
      if(!cs.has(ci + 1)){
        p.part2Perimeters.set(plotType, Number(p.part2Perimeters.get(plotType)) + 1)
        cs.add(ci + 1);
        p.part2CPerimeters.set(plotType, cs);
      }
    } else {
      if(grid[ri][ci + 1] === plotType) {
        cs.delete(ci + 1);
      }
      this.checkSpot(counted, ri, ci + 1, areas, plotType, p, grid);
    }
  }
}
