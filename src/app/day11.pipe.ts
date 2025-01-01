import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day11',
  standalone: true
})
export class Day11Pipe implements PipeTransform {

  private stoneToStepsToCount: Map<number,Map<number,number>> = new Map();

  transform(input: string): Solution {
    const after25 = input.split(' ').map((s) => Number(s))
      .map(s => this.countExpanded(s, 25))
      .reduce((a,b)=> a+b);

    const after75 = input.split(' ').map((s) => Number(s))
      .map(s => this.countExpanded(s, 75))
      .reduce((a,b)=> a+b);

    return {part1: `${after25}`, part2: `${after75}`};
  }

  private countExpanded(startingStone: number, steps: number): number{
    if(this.stoneToStepsToCount.get(startingStone)?.get(steps)){
      return this.stoneToStepsToCount.get(startingStone)?.get(steps) as number;
    }
    if(steps === 0){
      return 1;
    }
    return this.tick(startingStone)
      .map(s => {
        const count = this.countExpanded(s, steps - 1);
        this.cache(s, steps - 1, count);
        return count
      })
      .reduce((a,b)=> a+b);
  }

  private cache(stone: number, steps: number, count: number): void {
    if(!this.stoneToStepsToCount.get(stone)){
      this.stoneToStepsToCount.set(stone, new Map());
    }
    this.stoneToStepsToCount.get(stone)?.set(steps,count);
  }

  private tick(stone: number): number[] {
    if (stone === 0) {
      return [1];
    } else if(`${stone}`.length % 2 === 0) {
      const stoneStr = `${stone}`;
      return [
        Number(stoneStr.substring(0,stoneStr.length / 2)),
        Number(stoneStr.substring(stoneStr.length / 2))
      ];
    } else {
      return [stone * 2024];
    }
  }
}
