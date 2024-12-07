import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day2',
  standalone: true
})
export class Day2Pipe implements PipeTransform {

  transform(input: string): Solution {
    const rows = input.split('\n');
    const parsedRows = rows.map(rowStr => rowStr.trim().split(/\s+/).map(num => parseInt(num)));
    const safeRows = parsedRows.filter(this.safe);
    const nearlySafeRows = parsedRows.filter(row => this.nearlySafe(row));
    return {part1: `${safeRows.length}`, part2: `${nearlySafeRows.length}`};
  }

  safe(row: number[]): boolean {
    const increasing = row[0] > row[1];
    for(let i = 1; i < row.length; i++){
      if(Math.abs(row[i] - row[i-1]) > 3){
        return false;
      }
      if(increasing && row[i] >= row[i-1]){
        return false;
      }
      if(!increasing && row[i] <= row[i-1]){
        return false;
      }
    }
    return true;
  }

  nearlySafe(row: number[]): boolean {
    for(let i = 0; i < row.length; i++){
      const copy = row.slice();
      copy.splice(i, 1);
      if(this.safe(copy)){
        return true;
      }
    }
    return this.safe(row);
  }

}
