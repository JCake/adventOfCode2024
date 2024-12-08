import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day3',
  standalone: true
})
export class Day3Pipe implements PipeTransform {

  transform(input: string): Solution {
    let validMult = 0;
    let validMultPart2 = 0;
    const potentialMuls = input.split('mul');
    let active = true;
    let dontSpot = input[0].lastIndexOf(`don't()`);
    let doSpot = input[0].lastIndexOf('do()');
    active = doSpot >= dontSpot;
    for(let i = 1; i < potentialMuls.length; i++){
      const match = potentialMuls[i].match(/^\((\d{1,3})\,(\d{1,3})\).*/);
      if(match){
        const product = parseInt(match[1]) * parseInt(match[2]);
        validMult += product;
        if(active){
          validMultPart2 += product;
        }
      }
      let dontSpot = potentialMuls[i].lastIndexOf(`don't()`);
      let doSpot = potentialMuls[i].lastIndexOf('do()');
      if(dontSpot && (!doSpot || dontSpot > doSpot)){
        active = false;
      }else if(doSpot && (!dontSpot || doSpot > dontSpot)){
        active = true;
      }
    }
    return {part1: `${validMult}`, part2: `${validMultPart2}`};
  }

}
