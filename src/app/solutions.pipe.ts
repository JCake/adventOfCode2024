import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';
import { Day1Pipe } from './day1.pipe';
import { Day2Pipe } from './day2.pipe';
import { Day3Pipe } from './day3.pipe';
import { Day4Pipe } from './day4.pipe';
import { Day5Pipe } from './day5.pipe';
import { Day6Pipe } from './day6.pipe';
import { Day7Pipe } from './day7.pipe';
import { Day8Pipe } from './day8.pipe';
import { Day9Pipe } from './day9.pipe';

@Pipe({
  name: 'solutions',
  standalone: true,
})
export class SolutionsPipe implements PipeTransform {

  private Day1Pipe = Day1Pipe;
  private Day2Pipe = Day2Pipe;
  private Day3Pipe = Day3Pipe;
  private Day4Pipe = Day4Pipe;
  private Day5Pipe = Day5Pipe;
  private Day6Pipe = Day6Pipe;
  private Day7Pipe = Day7Pipe;
  private Day8Pipe = Day8Pipe;
  private Day9Pipe = Day9Pipe;

  transform(input: string, day: number): Solution {
    const pipe = eval(`new Day${day}Pipe()`);
    return pipe.transform(input);
  }

}
