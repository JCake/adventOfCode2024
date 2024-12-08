import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day4',
  standalone: true
})
export class Day4Pipe implements PipeTransform {

  transform(value: string): Solution {
    let xmasCount = 0;
    let xDashMasCount = 0;
    const grid = value.toLowerCase().trim().split('\n').map(row => row.trim()).map(row => row.split(''));
    console.log(grid);
    for(let y = 0; y < grid.length; y++){
      for(let x = 0; x < grid[y].length; x++){
        if(grid[y][x] === 'x'){
          xmasCount += this.masCountFrom(x,y,grid);
        }
        if(grid[y][x] === 'a'){
          xDashMasCount += this.isXMas(x,y,grid) ? 1 : 0;
        }
      }
    }
    return {part1: `${xmasCount}`, part2: `${xDashMasCount}`};
  }

  masCountFrom(x: number, y: number, grid: string[][]): number {
    let count = 0;
    if(x < grid[y].length - 3){
      if(grid[y][x+1] === 'm' && grid[y][x+2] === 'a' && grid[y][x+3] === 's'){
        count++;
      }
      if(y > 2){
        if(grid[y-1][x+1] === 'm' && grid[y-2][x+2] === 'a' && grid[y-3][x+3] === 's'){
          count++;
        }
      }
      if(y < grid.length - 3){
        if(grid[y+1][x+1] === 'm' && grid[y+2][x+2] === 'a' && grid[y+3][x+3] === 's'){
          count++;
        }
      }
    }
    if(x > 2){
      if(grid[y][x-1] === 'm' && grid[y][x-2] === 'a' && grid[y][x-3] === 's'){
        count++;
      }
      if(y > 2){
        if(grid[y-1][x-1] === 'm' && grid[y-2][x-2] === 'a' && grid[y-3][x-3] === 's'){
          count++;
        }
      }
      if(y < grid.length - 3){
        if(grid[y+1][x-1] === 'm' && grid[y+2][x-2] === 'a' && grid[y+3][x-3] === 's'){
          count++;
        }
      }
    }
    if(y < grid.length - 3){
      if(grid[y+1][x] === 'm' && grid[y+2][x] === 'a' && grid[y+3][x] === 's'){
        count++;
      }
    }
    if(y > 2){
      if(grid[y-1][x] === 'm' && grid[y-2][x] === 'a' && grid[y-3][x] === 's'){
        count++;
      }
    }
    return count;
  }

  isXMas(x: number, y: number, grid: string[][]) : boolean {
    return x > 0 && y > 0 && y < grid.length - 1 && x < grid[y].length - 1
     && ((grid[y-1][x-1]==='m' && grid[y-1][x+1] === 's' &&
     grid[y+1][x-1]==='m' && grid[y+1][x+1] === 's') ||
     (grid[y-1][x-1]==='m' && grid[y-1][x+1] === 'm' &&
     grid[y+1][x-1]==='s' && grid[y+1][x+1] === 's') || 
     (grid[y-1][x-1]==='s' && grid[y-1][x+1] === 'm' &&
     grid[y+1][x-1]==='s' && grid[y+1][x+1] === 'm') ||
     (grid[y-1][x-1]==='s' && grid[y-1][x+1] === 's' &&
     grid[y+1][x-1]==='m' && grid[y+1][x+1] === 'm'));
  }

}
