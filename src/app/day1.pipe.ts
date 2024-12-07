import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day1',
  standalone: true
})
export class Day1Pipe implements PipeTransform {

  transform(input: string): Solution {

    const col1: number[] = [];
    const col2: number[] = [];
    input.split('\n').forEach(row => {
      const parts = row.trim().split(/\s+/).map(num => parseInt(num.trim()));
      if(parts.length > 1){
        col1.push(parts[0]);
        col2.push(parts[1]);
      }
    });
    col1.sort();
    col2.sort();
    let sum = 0;
    let similarity = 0;
    for(let i = 0; i < col1.length; i++){
        sum += Math.abs(col1[i] - col2[i]);
        similarity += col1[i] * col2.filter(num => num === col1[i]).length;
    }
    return {part1: `${sum}`, part2: `${similarity}`};
  }

}
