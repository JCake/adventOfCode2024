import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day9',
  standalone: true
})
export class Day9Pipe implements PipeTransform {

  transform(input: string): Solution {
    const numbers = input.split('').map(s => parseInt(s));

    let memory: number[] = [];
    for(let n = 0; n < numbers.length; n++){
      for(let i = 0; i < numbers[n]; i++){
        memory.push(n % 2 === 0 ? n / 2 : -1);
      }
    }
    console.log(memory);
    while(memory[memory.length - 1] === -1){
      memory.pop();
    }
    for(let m = 0; m < memory.length - 1; m++){
      if(memory[m] === -1){
        let end = memory.pop() as number;
        memory[m] = end;
      }
      while(memory[memory.length - 1] === -1){
        memory.pop();
      }
    }

    let checksum = 0;
    for(let m = 0; m < memory.length && memory[m] >= 0; m++){
      checksum += m * memory[m];
    }

      
    return {part1: `${checksum}`, part2: '0'};
  }

}
