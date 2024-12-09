import { Day5Pipe } from './day5.pipe';

describe('Day5Pipe', () => {
  const SAMPLE = `47|53
  97|13
  97|61
  97|47
  75|29
  61|13
  75|53
  29|13
  97|29
  53|29
  61|53
  97|53
  61|29
  47|13
  75|47
  97|75
  47|61
  75|61
  47|29
  75|13
  53|13
  
  75,47,61,53,29
  97,61,53,29,13
  75,29,13
  75,97,47,61,53
  61,13,29
  97,13,75,29,47`;

  // laziness - not true TDD
  it('should work for part 1', () => {
    const pipe = new Day5Pipe();
    expect(pipe.transform(SAMPLE).part1).toEqual('143');
  });

  it('should work for part 2', () => {
    const pipe = new Day5Pipe();
    expect(pipe.transform(SAMPLE).part2).toEqual('123');
  });
});
