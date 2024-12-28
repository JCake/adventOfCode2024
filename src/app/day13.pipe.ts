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

      goal.x += 10000000000000;
      goal.y += 10000000000000;
      // goal.x === ac * a.x + bc * b.x
      // goal.y === ac * a.y + bc * b.y
      // (goal.x + goal.y) === ac * (a.x + a.y) + bc * (b.x + b.y)
      // ((goal.x + goal.y) - bc * (b.x + b.y)) / (a.x + a.y) === ac
      // goal.x === (((goal.x + goal.y) - bc * (b.x + b.y)) / (a.x + a.y)) * a.x + bc * b.x
      const goalSum = goal.x + goal.y;
      const bSum = b.x + b.y;
      const aSum = a.x + a.y;
      // goal.x === ((goalSum - bc * bSum) / aSum) * a.x + bc * b.x
      // goal.x * aSum === (goalSum - bc * bSum) * a.x + bc * b.x * aSum
      // goal.x * aSum === goalSum * a.x - bc * bSum * a.x + bc * b.x * aSum
      // goal.x * aSum - goalSum * a.x === bc * (b.x * aSum - bSum * a.x)
      // (goal.x * aSum - goalSum * a.x) / (b.x * aSum - bSum * a.x) === bc
      const bc =  (goal.x * aSum - goalSum * a.x) / (b.x * aSum - bSum * a.x);
      if(Math.floor(bc) === bc){
        // goal.x === ac * a.x + bc * b.x
        // (goal.x - bc * b.x) / a.x === ac
        const ac = (goal.x - bc * b.x) / a.x;
        sum2 += (ac * 3 + bc);
      }
      
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
