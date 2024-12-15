import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day7',
  standalone: true
})
export class Day7Pipe implements PipeTransform {

  transform(input: string): Solution {
    let sum1 = 0;
    let sum2 = 0;
    input.split(/\n/).forEach((value) => {
      const answerAndParts = value.split(':');
      const answer = parseInt(answerAndParts[0]);
      const parts = answerAndParts[1].trim()
        .split(/\s+/).map((s) => parseInt(s));
      const canForm = this.canFormAnswer(parts, answer);
      if(canForm.part1){
        sum1 += answer;
      }
      if(canForm.part2){
        sum2 += answer;
      }
    })
    return {part1: `${sum1}`, part2: `${sum2}`};
  }


  private canFormAnswer(parts: number[], answer: number): {part1: boolean, part2: boolean} {
    let operationOptions: string[][] = [[]];
    for(let i = 1; i < parts.length; i++) {
      const newList: string[][] = [];
      operationOptions.forEach((list) => {
        newList.push(list.concat(['+']));
        newList.push(list.concat(['*']));
        newList.push(list.concat(['||']));
      });
      operationOptions = newList;
    }
    const result = {part1: false, part2: false};
    for(let ooi = 0; ooi < operationOptions.length; ooi++){
      const oo = operationOptions[ooi];
      let calculation = parts[0];
      for(let i = 1; i < parts.length; i++){
        if(oo[i-1] === '+'){
          calculation += parts[i];
        } else if(oo[i-1] === '*'){
          calculation *= parts[i];
        } else {
          calculation = parseInt(`${calculation}${parts[i]}`);
        }
      }
      if(calculation === answer){
        if(oo.includes('||')){
          result.part2 = true;
        } else {
          return {part1: true, part2: true};
        }
      }
    }
    return result;
  }
}
