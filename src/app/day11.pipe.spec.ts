import { Day11Pipe } from './day11.pipe';

describe('Day11Pipe', () => {
  const pipe = new Day11Pipe();
  it('should count stones after 25 blinks for part 1', () => {
    expect(pipe.transform('125 17').part1).toEqual('55312');
  });
});
