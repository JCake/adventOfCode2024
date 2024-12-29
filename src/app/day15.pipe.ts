import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
}

@Pipe({
  name: 'day15',
  standalone: true
})
export class Day15Pipe implements PipeTransform {

  transform(input: string): Solution {
    const gridAndMoves = input.split('\n\n');
    const grid: string[][] = gridAndMoves[0].split('\n').map(row => row.trim().split(''));
    let robotLoc: Coord = {x: -1, y: -1};
    for(let r = 0; r < grid.length; r++){
      for(let c = 0; c < grid[r].length; c++){
        if(grid[r][c] === '@'){
          robotLoc.x = c;
          robotLoc.y = r; 
        }
      }
    }
    const moves: string[] = gridAndMoves[1].trim().split('');
    moves.forEach((move) => {
      if(move === '>'){
        this.moveRight(grid, robotLoc);
      }else if(move === '<'){
        this.moveLeft(grid, robotLoc);
      }else if(move === '^'){
        this.moveUp(grid, robotLoc);
      } else if(move === 'v'){
        this.moveDown(grid, robotLoc);
      }
    })
    let gpsSum = 0;
    for(let r = 0; r < grid.length; r++){
      for(let c = 0; c < grid[r].length; c++){
        if(grid[r][c] === 'O'){
          gpsSum += (100 * r + c); 
        }
      }
    }
    return {part1: `${gpsSum}`, part2: ``};
  }

  private moveRight(grid:string[][], robotLoc: Coord): void {
    this.move(grid, robotLoc, 1, 0);
  }

  private moveLeft(grid:string[][], robotLoc: Coord): void {
    this.move(grid, robotLoc, -1, 0);
  }

  private moveUp(grid:string[][], robotLoc: Coord): void {
    this.move(grid, robotLoc, 0, -1);
  }

  private moveDown(grid:string[][], robotLoc: Coord): void {
    this.move(grid, robotLoc, 0, 1);
  }

  private move(grid:string[][], robotLoc: Coord, xAdd: number, yAdd: number): void {
    const spotToMoveTo = grid[robotLoc.y + yAdd][robotLoc.x + xAdd];
    if(spotToMoveTo === '.'){
      grid[robotLoc.y + yAdd][robotLoc.x + xAdd] = '@';
      grid[robotLoc.y][robotLoc.x] = '.';
      robotLoc.y = robotLoc.y + yAdd;
      robotLoc.x = robotLoc.x + xAdd;
    } else if(spotToMoveTo === 'O'){
      if(xAdd){
        let firstEmptyX = -1;
        for(let px = robotLoc.x + 2 * xAdd; 
          px >= 0 && px < grid[robotLoc.y].length && grid[robotLoc.y][px] !== '#'&& firstEmptyX < 0; 
          px += xAdd){
          if(grid[robotLoc.y][px] === '.'){
            firstEmptyX = px;
          }
        }
        if(firstEmptyX > -1){
          grid[robotLoc.y][firstEmptyX] = 'O';
          grid[robotLoc.y][robotLoc.x + xAdd] = '@';
          grid[robotLoc.y][robotLoc.x] = '.';
          robotLoc.x = robotLoc.x + xAdd;
        }
      } else if(yAdd){
        let firstEmptyY = -1;
        for(let py = robotLoc.y + 2 * yAdd; 
          py >= 0 && py < grid.length && grid[py][robotLoc.x] !== '#' && firstEmptyY < 0; 
          py += yAdd){
          if(grid[py][robotLoc.x] === '.'){
            firstEmptyY = py;
          }
        }
        if(firstEmptyY > -1){
          grid[firstEmptyY][robotLoc.x] = 'O';
          grid[robotLoc.y + yAdd][robotLoc.x] = '@';
          grid[robotLoc.y][robotLoc.x] = '.';
          robotLoc.y = robotLoc.y + yAdd;
        }
      }
    }
  }

}
