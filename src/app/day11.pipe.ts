import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day11',
  standalone: true
})
export class Day11Pipe implements PipeTransform {

  transform(input: string): Solution {
    let listOfStones: number[] = input.split(' ').map((s) => Number(s));
    const startToStepsToOutput: Map<number, Map<number, number[]>> = new Map();
    this.generateSampleList(startToStepsToOutput, 1);
    this.generateSampleList(startToStepsToOutput, 4048);

    let finalList: number[] = [];
    listOfStones.forEach((stone) => {
      if(stone === 1){
        finalList = finalList.concat(startToStepsToOutput.get(1)?.get(25) || []);
      } else {
        let newList = [stone];
        const steps = new Map<number, number[]>();
        // TODO map to count instead of full map, use recursion to keep adding on
        for(let i = 1; i <= 5; i++){
          newList = this.expand(newList, 5, startToStepsToOutput)
          steps.set(i * 5, newList)
        }    
        startToStepsToOutput.set(stone, steps);
        finalList = finalList.concat(newList);
      }
    })
    listOfStones = finalList;
    const after25 = listOfStones.length;

    let after50 = 0;
    let after75 = 0;
    listOfStones.forEach((outerStone) => {
      listOfStones = [outerStone];

      listOfStones.forEach((outerStone) => {
        let outerStoneList: number[] = [];
        if(startToStepsToOutput.get(outerStone)){
          outerStoneList = outerStoneList.concat(
            startToStepsToOutput.get(outerStone)?.get(25) || []);
        } else {
          const steps = new Map<number, number[]>();
          const newList = this.expand([outerStone], 25, startToStepsToOutput)
          steps.set(25, newList)
          startToStepsToOutput.set(outerStone, steps);
          outerStoneList = outerStoneList.concat(newList);
        }
        after50 += outerStoneList.length;
        // TODO uncomment
        outerStoneList.forEach((stone) => {
          const stepsToResult = startToStepsToOutput.get(stone);
          if(stepsToResult){
            // TODO more scenarios
            // if(stepsToResult.get(25)){
            //   after75 += (stepsToResult.get(25)?.length) as number;
            // }
          } else {
            // const newList = this.expand(stone, 25, startToStepsToOutput)
            // const steps = new Map<number, number[]>();
            // steps.set(25, newList)
            // startToStepsToOutput.set(stone, steps);
            // after75 += newList.length;
          }    
        })
      })
      
    });

    // Approx:
    // let after75 = after50 * (after50 / after25);
    // 191014410921591 -> too low

    return {part1: `${after25}`, part2: `${after75}`};
  }

  private generateSampleList(
    startToStepsToOutput: Map<number, Map<number, number[]>>,
    start: number) {
    startToStepsToOutput.set(start, new Map());
    let sampleList = [start];
    for (let i = 0; i < 25; i++) {
      startToStepsToOutput.get(start)?.set(i, sampleList);
      sampleList = this.buildNewList(sampleList);
    }
    startToStepsToOutput.get(start)?.set(25, sampleList);
  }

  countStones(listsOfStones: number[][]): number {
    return listsOfStones.map(l => l.length).reduce((prev,curr) => prev + curr, 0);
  }

  private expand(stones: number[], steps: number, startToStepsToOutput: Map<number, Map<number, number[]>> = new Map()): number[] {
    let expanded = stones.slice();
    let others: number[] = [];
    for(let i = 0; i < steps; i++){
      const first = expanded[0];
      if(startToStepsToOutput.get(first)?.has(steps - i)){
        others = others.concat(startToStepsToOutput.get(first)?.get(steps - i) || []);
        expanded = expanded.slice(1);
      }
      expanded = this.buildNewList(expanded);
    }
    const endResult = expanded.concat(others);
    if(stones.length === 1){
      if(!startToStepsToOutput.get(stones[0])){
        startToStepsToOutput.set(stones[0], new Map());
      }
      startToStepsToOutput.get(stones[0])?.set(steps, endResult);
    }
    return endResult;
  }

  private buildNewList(stones: number[]) {
    const newStones: number[] = [];
    // 0; 1; 2024; 20 24; 2 0 2 4; 4048 1 4048 8096 
    // 1 -> 4 items (one of which is 1) in 4 steps
    stones.forEach((stone) => {
      if (stone === 0) {
        newStones.push(1);
      } else if(stone > 9 && stone < 100) {
        let mod = stone % 10;
        newStones.push(mod);
        newStones.push((stone - mod)/10)
      } else if(stone > 999 && stone < 10000){
        let mod = stone % 100;
        newStones.push(mod);
        newStones.push((stone - mod)/100);
      } else if(stone > 99999 && stone < 1000000){
        let mod = stone % 1000;
        newStones.push(mod);
        newStones.push((stone - mod)/1000);
      } else if(stone > 9999999 && stone < 100000000){
        let mod = stone % 10000;
        newStones.push(mod);
        newStones.push((stone - mod)/10000);
      } else if(stone > 999999999 && stone < 10000000000){
        let mod = stone % 100000;
        newStones.push(mod);
        newStones.push((stone - mod)/100000);
      } else {
        newStones.push(stone * 2024);
      }
    });
    return newStones;
  }

  private splitAsNeeded(lists: number[][]): number[][] {
    const smallerLists: number[][] = [];
    lists.forEach((list) => {
      if(list.length > 500000){
        smallerLists.push(list.slice(0,Math.floor(list.length / 2)));
        smallerLists.push(list.slice(Math.floor(list.length / 2)));
      } else {
        smallerLists.push(list);
      }
    })
    return smallerLists;
  }
}
