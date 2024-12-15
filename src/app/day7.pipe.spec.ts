import { Day7Pipe } from './day7.pipe';

describe('Day7Pipe', () => {
  const pipe = new Day7Pipe();

  describe('part 1', () => {
    it('should return value when calculation is possible - multiplication', () => {
      expect(pipe.transform('190: 10 19').part1).toEqual('190');
    });

    it('should return 0 when calculation is not possible', () => {
      expect(pipe.transform('83: 17 5').part1).toEqual('0');
    });

    it('should return value when calculation is possible - addition', () => {
      expect(pipe.transform('29: 10 19').part1).toEqual('29');
    });

    it('should return value when calculation is possible - addition - more numbers', () => {
      expect(pipe.transform('134: 10 19  5 100').part1).toEqual('134');
    });

    it('should return value when possible with mix of + and *', () => {
      expect(pipe.transform('292: 11 6 16 20').part1).toEqual('292');
    });

    it('should add up multiple results', () => {
      expect(pipe.transform(`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`).part1).toEqual('3749');
    });
  });

  it('should use additional operator option for part 2', () => {
    expect(pipe.transform(`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`).part2).toEqual('11387');
  });
});
