import { Day14Pipe } from './day14.pipe';

describe('Day14Pipe', () => {
  const pipe = new Day14Pipe();
  describe('part 1', () => {
    it('should find safety factor for smaller grid', () => {
      expect(pipe.transform(`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,7,11).part1).toEqual('12'); // 100 s
    });
  });
});
