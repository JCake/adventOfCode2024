import { Day9Pipe } from './day9.pipe';

describe('Day9Pipe', () => {
  const pipe = new Day9Pipe();

  describe('part 1 - checksum', () => {
    it('should return 0 for blank input', () => {
      expect(pipe.transform('').part1).toEqual('0');
    });

    it('should return 0 for single file since it has id 0', () => {
      expect(pipe.transform('1').part1).toEqual('0');
    });

    it('should return 0 for different single file since it has id 0', () => {
      expect(pipe.transform('8').part1).toEqual('0');
    });

    it('should calculate checksum for second file since it has id 1', () => {
      //0111 = 1 + 2 + 3 = 6
      expect(pipe.transform('113').part1).toEqual('6');
    });

    it('should calculate checksum for second file of different size', () => {
      //0111 = 1 + 2 + 3 + 4 = 10
      expect(pipe.transform('114').part1).toEqual('10');
    });

    it('should calculate checksum for several files already bunched together', () => {
      //0 * 0 + 1 * 0 +  // 2 of ID 0
      //2 * 1 + 3 * 1 + 4 * 1 + 5 * 1 + // 4 of ID 1
      //6 * 2 + 7 * 2 + 8 * 2 // 3 of ID 2
      expect(pipe.transform('20403').part1).toEqual('56');
    });

    it('should calculate checksum for several files that need to be moved to be bunched together', () => {
      // 0 0 . 1 1 1 1 . . . . . . . 2 2 2
      // 0 0 2 1 1 1 1 2 2
      // 0 * 0 + 1 * 0 + 2 * 2 + 3 * 1 + 4 * 1 + 5 * 1 + 6 * 1 + 7 * 2 + 8 * 2 = 
      expect(pipe.transform('21473').part1).toEqual('52');
    });

    it('should calculate checksum for sample input', () => {
      expect(pipe.transform('2333133121414131402').part1).toEqual('1928');
    })
  });

  xdescribe('part 2 - full file moving checksum', () => {
    it('should calculate checksum for sample input', () => {
      expect(pipe.transform('2333133121414131402').part2).toEqual('2858');
    });
  })
});
