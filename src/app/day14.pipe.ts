import { Pipe, PipeTransform } from '@angular/core';
import { Solution } from '../solutions';

@Pipe({
  name: 'day14',
  standalone: true
})
export class Day14Pipe implements PipeTransform {

  transform(input: string, width = 101, height = 103): Solution {
    const robots = input.split('\n').map(r => r.trim().split(' '));
    const endingPositions: {x: number, y: number}[] = [];
    robots.forEach((robot) => {
      const startXAndY = robot[0].split('=')[1].split(',').map(n => Number(n.trim()));
      const moveXAndY = robot[1].split('=')[1].split(',').map(n => Number(n.trim()));
      let endX = startXAndY[0] + 100 * moveXAndY[0];
      let endY = startXAndY[1] + 100 * moveXAndY[1];
      while(endX < 0){
        endX += width;
      }
      while(endY < 0){
        endY += height;
      }
      endingPositions.push(
        {
          x:(endX) % width, 
          y:(endY) % height
        }
      );
    });
    let upperLeft = 0;
    let upperRight = 0;
    let lowerLeft = 0;
    let lowerRight = 0;
    endingPositions.forEach((position) => {
      if(position.x < (width - 1)/2){
        if(position.y < (height - 1)/2){
          ++upperLeft;
        }
        if(position.y > (height-1)/2){
          ++lowerLeft;
        }
      }
      if(position.x > (width - 1)/2){
        if(position.y < (height - 1)/2){
          ++upperRight;
        }
        if(position.y > (height-1)/2){
          ++lowerRight;
        }
      }
    });
    const safetyScore = upperLeft * upperRight * lowerLeft * lowerRight;
    return {part1: `${safetyScore}`, part2: ``};
  }

}
