import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day10',
  standalone: true
})
export class Day10Pipe implements PipeTransform {

  transform(input: string): Solution {
    const grid = input.split('\n').map(row => row.split(''));
    let score = 0;
    let routes = 0;
    for(let ri = 0; ri < grid.length; ri++){
      for(let ci = 0; ci < grid[ri].length; ci++){
        if(grid[ri][ci] === '0'){
          let nines = new Set();
          this.adjacentMatches('1',ri,ci,grid).forEach(one => {
            this.adjacentMatches('2',one.ri,one.ci,grid).forEach(two => {
              this.adjacentMatches('3',two.ri,two.ci,grid).forEach(three => {
                this.adjacentMatches('4',three.ri,three.ci,grid).forEach(four => {
                  this.adjacentMatches('5',four.ri,four.ci,grid).forEach(five => {
                    this.adjacentMatches('6',five.ri,five.ci,grid).forEach(six => {
                      this.adjacentMatches('7',six.ri,six.ci,grid).forEach(seven => {
                        this.adjacentMatches('8',seven.ri,seven.ci,grid).forEach(eight => {
                          this.adjacentMatches('9',eight.ri,eight.ci,grid).forEach(nine => {
                            nines.add(`${nine.ri},${nine.ci}`);
                            routes++;
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          });
          score += nines.size;
        }
      }
    }
    return {part1: `${score}`, part2: `${routes}`};
  }

  adjacentMatches(toFind: string, ri: number, ci: number, grid: string[][]): {ri: number, ci: number}[] {
    const matches: {ri: number, ci: number}[] = []
    if(ci > 0 && grid[ri][ci-1] === toFind){
      matches.push({ri,ci:ci-1});
    }
    if(ci < grid[ri].length - 1 && grid[ri][ci+1] === toFind){
      matches.push({ri,ci: ci+1});
    }
    if(ri > 0 && grid[ri-1][ci] === toFind) {
      matches.push({ri: ri-1,ci});
    }
    if(ri < grid.length - 1 &&  grid[ri+1][ci] === toFind){
      matches.push({ri: ri+1,ci});
    }
    return matches;
  }

}
