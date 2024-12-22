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
    let memory2: number[] = [];
    for(let n = 0; n < numbers.length; n++){
      for(let i = 0; i < numbers[n]; i++){
        memory.push(n % 2 === 0 ? n / 2 : -1);
        memory2.push(n % 2 === 0 ? n / 2 : -1);
      }
    }
    while(memory[memory.length - 1] === -1){
      memory.pop();
    }
    while(memory2[memory2.length - 1] === -1){
      memory2.pop();
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

    const largestFileId = memory2[memory2.length - 1];
    for(let fi = largestFileId; fi >= 0; fi--){
      const start = memory2.indexOf(fi);
      const end = memory2.lastIndexOf(fi);
      const space = end - start + 1;
      for(let i = 0; i <= start - space; i++){
        let bigEnough = true;
        for(let ii = i; ii < i + space; ii++){
          if(memory2[ii] > -1){
            bigEnough = false;
            i = ii;
            break;
          }
        }
        if(bigEnough){
          for(let ii = i; ii < i + space; ii++){
            memory2[ii] = fi;
          }
          for(let ii = start; ii <= end; ii++){
            memory2[ii] = -1;
          }
          break;
        }
      }
    }
    console.log(memory2);

    let checksum = this.calculateChecksum(memory);
    let checksum2 = this.calculateChecksum(memory2);
      
    return {part1: `${checksum}`, part2: `${checksum2}`};
  }


  private calculateChecksum(memory: number[]) {
    let checksum = 0;
    for (let m = 0; m < memory.length; m++) {
      if(memory[m] > -1){
        checksum += m * memory[m];
      }
    }
    return checksum;
  }
}
