import { Day13Pipe } from './day13.pipe';

describe('Day13Pipe', () => {
  const pipe = new Day13Pipe();
  describe('part 1', () => {
    it('should return 0 if winning is not possible', () => {
      expect(pipe.transform(`Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176`).part1).toEqual('0');
    })
    it('should find cheapest way to win at a claw machine', () => {
      expect(pipe.transform(`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`).part1).toEqual('280');
    });
    it('should find cheapest way to win all prizes', () => {
      expect(pipe.transform(`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`).part1).toEqual('480');
    })
  })
});
