import { Day2Pipe } from './day2.pipe';

describe('Day2Pipe', () => {
  const pipe = new Day2Pipe();

  describe('part1', () => {
    it('should count as safe if all decreasing by 1 or 2', () => {
      expect(pipe.transform('7 6 4 2 1').part1).toEqual('1');
    });
  });
  
});
