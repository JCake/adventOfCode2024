import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day7',
  standalone: true
})
export class Day7Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
