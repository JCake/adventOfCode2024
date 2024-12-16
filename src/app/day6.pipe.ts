import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day6',
  standalone: true
})
export class Day6Pipe implements PipeTransform {

  transform(input: string): Solution {
    const grid = input.trim().split('\n').map(line => line.trim().split(''));
    let openSpots = [];
    for(let yi = 0; yi < grid.length; yi++){
      for(let xi = 0; xi < grid[yi].length; xi++){
        if(grid[yi][xi] === '.'){
          openSpots.push([yi,xi]);
        }
      }
    }

    this.travel(grid);
    let traveledSpots = 0;
    for (let yi = 0; yi < grid.length; yi++) {
      for (let xi = 0; xi < grid[yi].length; xi++) {
        if (grid[yi][xi] === 'X') {
          traveledSpots++;
        }
      }
    }

    let loopCount = 0;
    openSpots.forEach((spot) => {
      const alteredGrid = input.trim().split('\n').map(line => line.trim().split(''));
      alteredGrid[spot[0]][spot[1]] = '#';
      if(this.travel(alteredGrid)) {
        loopCount++;
      }
    })
    return {part1: `${traveledSpots}`, part2: `${loopCount}`};
  }

  // returns true if the path loops
  private travel(grid: string[][]): boolean {
    let x = 0;
    let y = 0;
    let visited = new Set();
    for (let yi = 0; yi < grid.length; yi++) {
      for (let xi = 0; xi < grid[yi].length; xi++) {
        if (grid[yi][xi] === '^') {
          x = xi;
          y = yi;
          grid[yi][xi] = 'X';
          visited.add(`${x},${y}:^`);
          break;
        }
      }
    }
    // up:
    let xStep = 0;
    let yStep = -1;
    while (x + xStep >= 0 && x + xStep < grid[y].length
      && y + yStep >= 0 && y + yStep < grid.length) {
      if (grid[y + yStep][x + xStep] === '#') {
        if (xStep === 0) {
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
      const spot = `${x},${y}:${this.direction(xStep, yStep)}`;
      if(visited.has(spot)){
        return true;
      }
      visited.add(`${x},${y}:${this.direction(xStep, yStep)}`);
    }
    return false;
  }

  direction(xStep: number, yStep: number): string {
    if(xStep === 0 && yStep === -1){
      return '^'
    } else if(xStep === 0 && yStep === 1){
      return 'v';
    } else if(xStep === 1){
      return '>';
    } else {
      return '<';
    }
  }

}
