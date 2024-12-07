import { Day2Pipe } from './day2.pipe';

describe('Day2Pipe', () => {
  const pipe = new Day2Pipe();

  describe('part1', () => {
    it('should count as safe if all decreasing by 1, 2, or 3', () => {
      expect(pipe.transform('8 7 4 2 1').part1).toEqual('1');
    });

    it('should count as unsafe if any number repeat', () => {
      expect(pipe.transform('8 6 4 4 1').part1).toEqual('0');
    });

    it('should count as unsafe if any number decreases by more than 3', () => {
      expect(pipe.transform('18 7 4 2 1').part1).toEqual('0');
    });

    it('should count as safe if all increasing by 1, 2, or 3', () => {
      expect(pipe.transform('1 3 6 7 9').part1).toEqual('1');
    });

    it('should count as unsafe if numbers are a mix of increasing and decreasing', () => {
      expect(pipe.transform('1 3 2 4 5').part1).toEqual('0');
    });

    it('should count as unsafe if numbers are a mix of increasing and decreasing - different order', () => {
      expect(pipe.transform('5 3 6 4 1').part1).toEqual('0');
    });

    it('should handle extra whitespace', () => {
      expect(pipe.transform(' 1  3  6  7   9 ').part1).toEqual('1');
    });

    it('should add up all safe from multiple lines of input', () => {
      expect(pipe.transform(`7 6 4 2 1
      1 2 7 8 9
      9 7 6 2 1
      1 3 2 4 5
      8 6 4 4 1
      1 3 6 7 9`).part1).toEqual('2');
    });

    
    it('should work with multi-digit numbers', () => {
      expect(pipe.transform(' 15  18  21  22   25 ').part1).toEqual('1');
    });
  });

  describe('part 2', () => {
    it('should now count as safe if a number being removed would make it safe', () => {
      expect(pipe.transform('1 3 2 4 5').part2).toEqual('1');
    });

    it('should still count as unsafe if no number removal would make it safe', () => {
      expect(pipe.transform('9 7 6 2 1').part2).toEqual('0');
    });

    it('should add up total number nearly safe', () => {
      expect(pipe.transform(`7 6 4 2 1
      1 2 7 8 9
      9 7 6 2 1
      1 3 2 4 5
      8 6 4 4 1
      1 3 6 7 9`).part2).toEqual('4');
    })
  })
  
});
