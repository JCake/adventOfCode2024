import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day5',
  standalone: true
})
export class Day5Pipe implements PipeTransform {

  transform(input: string): Solution {
    const rows = input.split('\n').map(row => row.trim());
    let onRules = true;
    const mapToPagesAfter: Map<string,string[]> = new Map();
    const mapToPagesBefore: Map<string,string[]> = new Map();
    const pagesLists: string[][] = [];
    rows.forEach((row) => {
      if(row === ''){
        onRules = false;
      }
      else if(onRules) {
        const ruleParts = row.split('|');
        const before = ruleParts[0];
        const after = ruleParts[1];
        const afterList = mapToPagesAfter.get(before) || [];
        afterList.push(after);
        mapToPagesAfter.set(before, afterList);
        const beforeList = mapToPagesBefore.get(after) || [];
        beforeList.push(before);
        mapToPagesBefore.set(after, beforeList);
      }
      else {
        pagesLists.push(row.split(','))
      }
    });
    let middleSum = 0;
    let fixedInvalidsMiddleSum = 0;
    pagesLists.forEach((pageList) => {
      const valid = this.checkIfValid(pageList, mapToPagesBefore, mapToPagesAfter);
      if(valid){
        middleSum += this.middleValue(pageList);
      } else {
        fixedInvalidsMiddleSum += parseInt(this.middleValueAfterValid(
          pageList, mapToPagesBefore, mapToPagesAfter));
      }
    })
    return {part1: `${middleSum}`, part2: `${fixedInvalidsMiddleSum}`};
  }
  
  private middleValueAfterValid(pageList: string[], mapToPagesBefore: Map<string, string[]>, mapToPagesAfter: Map<string, string[]>): string {
    for(let i = 0; i < pageList.length; i++){
      const candidate = pageList[i];
      const mustBeBefore = mapToPagesBefore.get(candidate) || [];
      const mustBeAfter = mapToPagesAfter.get(candidate) || [];
      const others = pageList.slice(0,i).concat(pageList.slice(i+1));
      const countMustBeBefore = others.filter(o => mustBeBefore.includes(o)).length;
      const countMustBeAfter = others.filter(o => mustBeAfter.includes(o)).length;
      if(countMustBeAfter < pageList.length / 2 && countMustBeBefore < pageList.length / 2){
        return candidate;
      }

    
    }
    return '';
  }

  private allOrders(list: string[]): string[][] {
    if(!list.length){
      return [];
    }
    if(list.length === 1){
      return [list];
    }
    let finalList: string[][] = [];
    for(let i = 0; i < list.length; i++){
      const subList = list.slice(0,i).concat(list.slice(i+1));
      finalList = finalList.concat(this.allOrders(subList) 
        .map(sublist => sublist.concat(list[i])));
    }
    return finalList;
  }

  private middleValue(pageList: string[]) {
    return parseInt(pageList[Math.floor(pageList.length / 2)]);
  }

  checkIfValid(pageList: string[], mapToPagesBefore: Map<string, string[]>, mapToPagesAfter: Map<string, string[]>) : boolean {
    let valid = true;
      for(let i = 0; i < pageList.length; i++){
        const before = pageList.slice(0,i);
        const after = pageList.slice(i + 1);
        const onlyAllowedBefore = mapToPagesBefore.get(pageList[i]);
        const onlyAllowedAfter = mapToPagesAfter.get(pageList[i]);
        if(before.some(b => onlyAllowedAfter?.includes(b))){
          valid = false;
          break;
        }
        if(after.some(a => onlyAllowedBefore?.includes(a))){
          valid = false;
          break;
        }
      }
      return valid;
  }

}
