import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day11',
  standalone: true
})
export class Day11Pipe implements PipeTransform {

  transform(input: string): Solution {
    let listOfStones: number[] = input.split(' ').map((s) => Number(s));
    let startToAfter: Map<number, number[]> = new Map();
    const startToStepsToOutput: Map<number, Map<number, number[]>> = new Map();
    startToStepsToOutput.set(1, new Map());
    let sampleList = [1];
    for(let i = 0; i < 25; i++){
      startToStepsToOutput.get(1)?.set(i, sampleList);
      sampleList = this.buildNewList(sampleList);
    }
    startToStepsToOutput.get(1)?.set(25, sampleList);

    let finalList: number[] = [];
    listOfStones.forEach((stone) => {
      if(stone === 1){
        finalList = finalList.concat(startToStepsToOutput.get(1)?.get(25) || []);
      } else {
        const newList = this.expand(stone, 25, startToStepsToOutput)
        const steps = new Map<number, number[]>();
        steps.set(25, newList)
        startToStepsToOutput.set(stone, steps);
        finalList = finalList.concat(newList);
      }
    })
    listOfStones = finalList;
    const after25 = listOfStones.length;

    let after75 = 0;
    listOfStones.forEach((outerStone) => {
      listOfStones = [outerStone];

      listOfStones.forEach((stone) => {
        let stoneList: number[] = [];
        if(startToStepsToOutput.get(stone)){
          stoneList = stoneList.concat(startToStepsToOutput.get(stone)?.get(25) || []);
        } else {
          // TODO uncomment
          // const newList = this.expand(stone, 25, startToStepsToOutput)
          // const steps = new Map<number, number[]>();
          // steps.set(25, newList)
          // startToStepsToOutput.set(stone, steps);
          // stoneList = stoneList.concat(newList);
        }
        // TODO another 25
        after75 += stoneList.length;
      })
      


      // Need 50 more iterations -> 6 x 8 = 48
      // for(let i = 0; i < 1; i++){ // TODO 3 needs to be 8
      //   let newList: number[] = [];
      //   listOfStones.forEach((stone) => {
      //     let after = startToAfter.get(stone);
      //     if(after){
      //       newList = newList.concat(after);
      //     } else {
      //       const additionalItems = this.expand(stone, 6);
      //       startToAfter.set(stone, additionalItems);
      //       newList = newList.concat(additionalItems);
      //     }
      //   })
      //   listOfStones = newList;  
      // }
      // listOfStones.forEach((stone) => {
      //   after75 += this.expand(stone, 2).length;
      // })
    });

    return {part1: `${after25}`, part2: `${after75}`};
  }

  countStones(listsOfStones: number[][]): number {
    return listsOfStones.map(l => l.length).reduce((prev,curr) => prev + curr, 0);
  }

  private expand(stone: number, steps: number, startToStepsToOutput: Map<number, Map<number, number[]>> = new Map()): number[] {
    let expanded = [stone];
    let others: number[] = [];
    for(let i = 0; i < steps; i++){
      if(startToStepsToOutput.has(1)){
        expanded.filter((e) => e === 1).forEach((one) => {
          others = others.concat(startToStepsToOutput.get(1)?.get(steps - i) || []);
        });
        expanded = expanded.filter((e) => e !== 1);
      }
      expanded = this.buildNewList(expanded);
    }
    return expanded.concat(others);
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
