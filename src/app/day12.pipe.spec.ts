import { Day12Pipe } from './day12.pipe';

describe('Day12Pipe', () => {
  const pipe = new Day12Pipe();
  describe('part 1', () => {
    it('should return perimeter for single 1-area plot', () => {
      expect(pipe.transform('A').part1).toEqual('4');
    });

    it('should return area x perimeter for larger plot', () => {
      expect(pipe.transform('AA').part1).toEqual('12');
    });

    it('should return area x perimeter for 2d plot', () => {
      expect(pipe.transform('AA\nAA').part1).toEqual('32');
    });

    it('should add up costs for multiple types of plots', () => {
      expect(pipe.transform('AA\nBB').part1).toEqual('24');
    });

    it('should add up even more costs for different plots', () => {
      expect(pipe.transform(`AAAA
BBCD
BBCC
EEEC`).part1).toEqual('140');
    });

    it('should work with repeated plots of the same type', () => {
      expect(pipe.transform(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`).part1).toEqual('772');
    });

    it('should work with bigger example', () => {
      expect(pipe.transform(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`).part1).toEqual('1930');
    })
  })
});
