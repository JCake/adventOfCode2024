import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day11',
  standalone: true
})
export class Day11Pipe implements PipeTransform {

  transform(input: string): Solution {
    let listOfStones: number[] = input.split(' ').map((s) => Number(s));
    for(let i = 0; i < 25; i++){
      listOfStones = this.buildNewList(listOfStones);     
    }
    const after25 = listOfStones.length;

    let listsOfStones: number[][] = listOfStones.map((stone) => [stone]);
    let after75 = 0;
    // TODO get this performant enough:
    // for(let li = 0; li < listsOfStones.length; li++){
    //   let stones = listsOfStones[li];
    //   for(let i = 0; i < 15; i++){
    //     stones = this.buildNewList(stones);
    //   }
    //   let subListsOfStones: number[][] = stones.map((stone) => [stone]);
    //   for(let sli = 0; sli < subListsOfStones.length; sli++){
    //     let substones = subListsOfStones[sli];
    //     for(let i = 0; i < 1; i++){
    //       substones = this.buildNewList(substones);
    //     }
    //     after75 += substones.length;
    //   }
    // }

    return {part1: `${after25}`, part2: `${after75}`};
  }

  countStones(listsOfStones: number[][]): number {
    return listsOfStones.map(l => l.length).reduce((prev,curr) => prev + curr, 0);
  }

  private buildNewList(stones: number[]) {
    const newStones: number[] = [];
    stones.forEach((stone) => {
      if (stone === 0) {
        newStones.push(1);
      } else if (`${stone}`.length % 2 === 0) {
        const stoneStr = `${stone}`;
        newStones.push(Number(stoneStr.substring(0, stoneStr.length / 2)));
        newStones.push(Number(stoneStr.substring(stoneStr.length / 2)));
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
