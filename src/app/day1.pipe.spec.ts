import { Day1Pipe } from './day1.pipe';

describe('Day1Pipe', () => {

  const pipe = new Day1Pipe();

  describe('part 1', () => {
    it('should return 0 for empty string', () => {
      expect(pipe.transform('').part1).toEqual('0');
    });

    it('should return difference for single line', () => {
      expect(pipe.transform('1 3').part1).toEqual('2');
    })

    it('should return difference for single line reverse order', () => {
      expect(pipe.transform('3 1').part1).toEqual('2');
    })

    it('should return sum of differences for columns already sorted', () => {
      expect(pipe.transform('3 1\n4 7').part1).toEqual('5');
    });

    it('should return sum of differences after sorting', () => {
      expect(pipe.transform('4 1\n3 7').part1).toEqual('5');
    });

    it('should work with additional whitespace', () => {
      expect(pipe.transform(`4   1
      3   7 
      `).part1).toEqual('5');
    });

    it('should work with sample input', () => {
      expect(pipe.transform(`3   4
      4   3
      2   5
      1   3
      3   9
      3   3`).part1).toEqual('11');
    });
  });

  describe('part 2', () => {
    it('should return 0 for empty list', () => {
      expect(pipe.transform('').part2).toEqual('0');
    })

    it('should return 0 for two different numbers', () => {
      expect(pipe.transform('1 2').part2).toEqual('0');
    })

    it('should return the number for equal numbers - one line', () => {
      expect(pipe.transform('2 2').part2).toEqual('2');
    });

    it('should return the number times two if exactly two matches on right for one number on the left', () => {
      expect(pipe.transform('3 3\n1 3').part2).toEqual('6');
    });

    it('should add up number times number of matches on the right for each number on the left', () => {
      expect(pipe.transform('3 3\n2 3\n3 2').part2).toEqual('14');
    });

    it('should work for sample input', () => {
      expect(pipe.transform(`3   4
      4   3
      2   5
      1   3
      3   9
      3   3`).part2).toEqual('31');
    })
  });
});
