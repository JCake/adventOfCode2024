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
    listOfStones = this.buildNewList(listOfStones);
    for(let i = 0; i < 4; i++){
      let newList: number[] = [];
      listOfStones.forEach((stone) => {
        let after = startToAfter.get(stone);
        if(after){
          newList = newList.concat(after);
        } else {
          const additionalItems = this.expand(stone, 6);
          startToAfter.set(stone, additionalItems);
          newList = newList.concat(additionalItems);
        }
      })
      listOfStones = newList;     
    }
    const after25 = listOfStones.length;

    let after75 = 0;
    listOfStones.forEach((outerStone) => {
      listOfStones = [outerStone];
      // Need 50 more iterations -> 6 x 8 = 48
      for(let i = 0; i < 3; i++){ // TODO 3 needs to be 8
        let newList: number[] = [];
        listOfStones.forEach((stone) => {
          let after = startToAfter.get(stone);
          if(after){
            newList = newList.concat(after);
          } else {
            const additionalItems = this.expand(stone, 6);
            startToAfter.set(stone, additionalItems);
            newList = newList.concat(additionalItems);
          }
        })
        listOfStones = newList;  
      }
      listOfStones.forEach((stone) => {
        after75 += this.expand(stone, 2).length;
      })
    });

    return {part1: `${after25}`, part2: `${after75}`};
  }

  countStones(listsOfStones: number[][]): number {
    return listsOfStones.map(l => l.length).reduce((prev,curr) => prev + curr, 0);
  }

  private expand(stone: number, steps: number): number[] {
    let expanded = [stone];
    for(let i = 0; i < steps; i++){
      expanded = this.buildNewList(expanded);
    }
    return expanded;
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
