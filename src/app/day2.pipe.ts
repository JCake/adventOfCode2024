import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day2',
  standalone: true
})
export class Day2Pipe implements PipeTransform {

  transform(input: string): Solution {
    return {part1: '0', part2: '0'};
  }

}
