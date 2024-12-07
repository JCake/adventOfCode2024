import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';
import { Day1Pipe } from './day1.pipe';
import { Day2Pipe } from './day2.pipe';

@Pipe({
  name: 'solutions',
  standalone: true,
})
export class SolutionsPipe implements PipeTransform {

  private Day1Pipe = Day1Pipe;
  private Day2Pipe = Day2Pipe;

  transform(input: string, day: number): Solution {
    const pipe = eval(`new Day${day}Pipe()`);
    return pipe.transform(input);
  }

}
