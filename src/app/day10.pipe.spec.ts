import { Day10Pipe } from './day10.pipe';

describe('Day10Pipe', () => {
  const pipe = new Day10Pipe();
  describe('part 1', () => {
    it('should return 1 for single trailhead with single path', () => {
      expect(pipe.transform(`0123
1234
8765
9876`).part1).toEqual('1');
    });

    it('should return 2 for a trailhead with 2 paths', () => {
      expect(pipe.transform(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`).part1).toEqual('2');
    });

    it('should only count reachable peaks', () => {
      expect(pipe.transform(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`).part1).toEqual('4');
    });

    it('should add up scores from multiple trailheads', () => {
      expect(pipe.transform(`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`).part1).toEqual('3');
    });

    it('should work for sample', () => {
      expect(pipe.transform(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`).part1).toEqual('36');
    })
  });

  describe('part 2', ()=> {
    it('should find rating', () => {
      expect(pipe.transform(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`).part2).toEqual('81');
    })
  })
});
