import { Day6Pipe } from './day6.pipe';

describe('Day6Pipe', () => {
  it('should work for part 1', () => {
    const pipe = new Day6Pipe();
    expect(pipe.transform(`....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...`).part1).toEqual('41');
  });
});