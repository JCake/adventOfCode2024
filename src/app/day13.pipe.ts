import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day13',
  standalone: true
})
export class Day13Pipe implements PipeTransform {

  // A = 3; B = 1
  transform(input: string): Solution {
    const machines = input.split('\n\n');
    let sum = 0;
    let sum2 = 0;
    machines.forEach((machine) => {
      const lines = machine.split('\n');
      const a = this.adjustment(lines[0]);
      const b = this.adjustment(lines[1]);
      const goal = this.goal(lines[2]);
      let min = 0;
      for(let ac = 0; ac<=100; ac++){
        for(let bc = 0; bc<=100; bc++){
          if(goal.x === (a.x * ac + b.x * bc)
            && goal.y === (a.y * ac + b.y * bc)){
            const cost = ac * 3 + bc;
            if(!min || cost < min){
              min = cost;
            }
          }
        }
      }
      sum += min;

      goal.x += 100000000000; //  00
      goal.y += 100000000000;
      min = 0;
      let maxA = Math.min(Math.floor(goal.x / a.x), Math.floor(goal.y / a.y));
      let maxB = Math.min(Math.floor(goal.x / b.x), Math.floor(goal.y / b.y));
      let minA = Math.max(
        Math.ceil((goal.x - maxB * b.x) / a.x),
        Math.ceil((goal.y - maxB * b.y) / a.y)
      )
      // goal.x === ac * a.x + bc * b.x
      // goal.y === ac * a.y + bc * b.y
      // (goal.x + goal.y) === ac * (a.x + a.y) + bc * (b.x + b.y)
      // ((goal.x + goal.y) - bc * (b.x + b.y)) / (a.x + a.y) === ac
      for(let ac = minA; ac<=maxA && !min; ac++){
        const bc = (goal.x - ac * a.x) / b.x;
        //if((goal.x - ac * a.x) % b.x === 0){
          if(bc * b.y === (goal.y - ac * a.y)){
            const cost = ac * 3 + bc;
            if(!min){
              min = cost;
            }
          }
        //}
      }
      sum2 += min;
    })
    return {part1: `${sum}`, part2: `${sum2}`};
  }

  private adjustment(line: string): {x: number, y:number} {
    return this.xAndY(line, '+');
  }

  private goal(line: string): {x: number, y:number} {
    return this.xAndY(line, '=');
  }

  private xAndY(line: string, divider: string): {x: number, y:number} {
    const xAndY = line.split(': ')[1].split(', ');
    return {x: this.numPart(xAndY[0], divider), y: this.numPart(xAndY[1], divider)}
  }

  private numPart(rule: string, divider: string): number {
    return Number(rule.split(divider)[1].trim());
  }

}
