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
    const moves = gridAndMoves[1];
    const grid: string[][] = gridAndMoves[0].split('\n').map(row => row.trim().split(''));
    const expandedGrid: string[][] = gridAndMoves[0].split('\n')
    .map(row => row.trim().split('').flatMap(s => this.expand(s)));
    
    let gpsSum = this.moveAndCalc(grid,moves);

    this.printGrid(expandedGrid);
    let part2GpsSum = this.moveAndCalc(expandedGrid,moves);
    this.printGrid(expandedGrid);

    // 1557366 is too low for real answer; sample works

    return {part1: `${gpsSum}`, part2: `${part2GpsSum}`};
  }

  private printGrid(expandedGrid: string[][]) {
    console.log(expandedGrid.map((row) => {
      return (row.join(''));
    }).join('\n'));
  }

  private moveAndCalc(grid: string[][], movesStr: string) {
    let robotLoc: Coord = { x: -1, y: -1 };
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === '@') {
          robotLoc.x = c;
          robotLoc.y = r;
        }
      }
    }
    const moves: string[] = movesStr.trim().split('');
    moves.forEach((move) => {
      if (move === '>') {
        this.moveRight(grid, robotLoc);
      } else if (move === '<') {
        this.moveLeft(grid, robotLoc);
      } else if (move === '^') {
        this.moveUp(grid, robotLoc);
      } else if (move === 'v') {
        this.moveDown(grid, robotLoc);
      }
    });
    let gpsSum = 0;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === 'O'  || grid[r][c] === '[') {
          gpsSum += (100 * r + c);
        }
      }
    }
    return gpsSum;
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
    } else if(spotToMoveTo === '[' || spotToMoveTo === ']'){
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
          for(let x = firstEmptyX; x != robotLoc.x + xAdd; x -= xAdd){
            grid[robotLoc.y][x] = grid[robotLoc.y][x - xAdd];
          }
          grid[robotLoc.y][robotLoc.x + xAdd] = '@';
          grid[robotLoc.y][robotLoc.x] = '.';
          robotLoc.x = robotLoc.x + xAdd;
        }
      } else if(yAdd){
        const adjacentXs: number[][] = [];
        if(spotToMoveTo === '['){
          adjacentXs.push([robotLoc.x,robotLoc.x + 1]);
        }
        else if(spotToMoveTo === ']'){
          adjacentXs.push([robotLoc.x - 1,robotLoc.x]);
        }
        let firstEmptyY = -1;
        let blocked = false;
        for(let py = robotLoc.y + 2 * yAdd; 
          py >= 0 && py < grid.length && !blocked && firstEmptyY < 0; 
          py += yAdd){
            const xs = adjacentXs[adjacentXs.length - 1];
            if(xs.every((x) => {
              return grid[py][x] === '.'
            })){
              firstEmptyY = py;
            } else {
              if(xs.some((x) => {
                return grid[py][x] === '#'
              })){
                blocked = true;
              } else {
                const nextXs = [];
                if(grid[py][xs[0]] === ']'){
                  nextXs.push(xs[0] - 1);
                } 
                for(let i = 0; i < xs.length; i++){
                  const x = xs[i];
                  if(grid[py][x] !== '.'){
                    nextXs.push(x);
                  }
                }
                if(grid[py][xs[xs.length - 1]] === '['){
                  nextXs.push(xs[xs.length - 1] + 1);
                } 
                adjacentXs.push(nextXs);
              }
            }
        }
        if(firstEmptyY > -1){
          let prevXs: number[] = [];
          for(let yi = firstEmptyY; yi != robotLoc.y + yAdd; yi -= yAdd){
            const xs: number[] = adjacentXs.pop() as number[];
            xs?.forEach(x => {
              grid[yi][x] = grid[yi - yAdd][x];
            });
            prevXs.forEach(x => {
              if(!xs.includes(x)){
                grid[yi][x] = '.';
              }
            })
            prevXs = xs;
          }
          prevXs.forEach((x) => {
            grid[robotLoc.y + yAdd][x] = '.';
          })
          grid[robotLoc.y + yAdd][robotLoc.x] = '@';
          grid[robotLoc.y][robotLoc.x] = '.';
          robotLoc.y = robotLoc.y + yAdd;
        }
      }
    }
  }

  expand(s: string): string[] {
    if(s === '#'){
      return ['#','#'];
    }
    if(s === 'O'){
      return ['[',']'];
    }
    if(s === '.'){
      return ['.','.'];
    }
    if(s === '@'){
      return ['@','.'];
    }
    return [];
  }
}
