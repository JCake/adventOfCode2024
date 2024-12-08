import { Day3Pipe } from './day3.pipe';

describe('Day3Pipe', () => {
  // I've gotten lazy:
  it('should work for part 1', () => {
    const pipe = new Day3Pipe();
    expect(pipe.transform(
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
      ).part1).toEqual('161');
  });

  it('should not count if stuff between mul and parens', () => {
    const pipe = new Day3Pipe();
    expect(pipe.transform(
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul (8,5))'
      ).part1).toEqual('121');
  });

  it('should disable some mul for part 2', () => {
    const pipe = new Day3Pipe();
    expect(pipe.transform(
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
      ).part2).toEqual('48');
  });
});
