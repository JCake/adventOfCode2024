import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day6',
  standalone: true
})
export class Day6Pipe implements PipeTransform {

  transform(input: string): Solution {
    const grid = input.trim().split('\n').map(line => line.trim().split(''));
    let x = 0;
    let y = 0;
    for(let yi = 0; yi < grid.length; yi++){
      for(let xi = 0; xi < grid[yi].length; xi++){
        if(grid[yi][xi] === '^'){
          x = xi;
          y = yi;
          grid[yi][xi] = 'X';
          break;
        }
      }
    }
    // up:
    let xStep = 0;
    let yStep = -1;
    while(x + xStep >= 0 && x + xStep < grid[y].length 
      && y + yStep >= 0 && y + yStep < grid.length){
      if(grid[y + yStep][x + xStep] === '#'){
        if(xStep === 0){
          xStep = xStep - yStep;
          yStep = 0;
        } else {
          yStep = xStep - yStep;
          xStep = 0;
        }
      } else {
        x = x + xStep;
        y = y + yStep;
        grid[y][x] = 'X';
      }
    }

    let traveledSpots = 0;
    for(let yi = 0; yi < grid.length; yi++){
      for(let xi = 0; xi < grid[yi].length; xi++){
        if(grid[yi][xi] === 'X'){
          traveledSpots++;
        }
      }
    }
    return {part1: `${traveledSpots}`, part2: ''};
  }

}
