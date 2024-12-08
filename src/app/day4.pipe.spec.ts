import { Day4Pipe } from './day4.pipe';

describe('Day4Pipe', () => {
  const pipe = new Day4Pipe();

  it('shoud find nothing from empty string', () => {
    expect(pipe.transform('').part1).toEqual('0');
  });
  it('shoud find nothing from no xmas', () => {
    expect(pipe.transform('ghfdj\nrrrrr\nxmsss').part1).toEqual('0');
  });
  it('shoud find xmas forward', () => {
    expect(pipe.transform('xmas').part1).toEqual('1');
  });
  it('shoud find xmas backward', () => {
    expect(pipe.transform('samx').part1).toEqual('1');
  });
  it('shoud find xmas up', () => {
    expect(pipe.transform('s\na\nm\nx').part1).toEqual('1');
  });
  it('shoud find xmas down', () => {
    expect(pipe.transform('x\nm\na\ns').part1).toEqual('1');
  });
  it('shoud find xmas diagonals', () => {
    expect(pipe.transform(
      `syys
       waaw
       nmmn
       xyyx`).part1).toEqual('2');
  });
  it('shoud find xmas opposite diagonals', () => {
    expect(pipe.transform(
      `xyyx
       wmmw
       naan
       syys`).part1).toEqual('2');
  });
  it('shoud not find other mas', () => {
    expect(pipe.transform(
      `ayya
       wmmw
       naan
       syys`).part1).toEqual('0');
  });
  it('should solve part 1', () => {
    expect(pipe.transform(`MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX`).part1).toEqual('18');
  });

  it('should find an X-MAS for part 2', () => {
    expect(pipe.transform(`M.S
    .A.
    M.S`).part2).toEqual('1');
  });

  it('should detect no X-MAS for part 2', () => {
    expect(pipe.transform(`M.M
    .A.
    M.S`).part2).toEqual('0');
  });

  it('should find differently arranged X-MAS for part 2', () => {
    expect(pipe.transform(`S.M
    .A.
    S.M`).part2).toEqual('1');
  });

  it('should find another differently arranged X-MAS for part 2', () => {
    expect(pipe.transform(`M.M
    .A.
    S.S`).part2).toEqual('1');
  });

  it('should find yet another differently arranged X-MAS for part 2', () => {
    expect(pipe.transform(`S.S
    .A.
    M.M`).part2).toEqual('1');
  });

  it('should solve part 2', () => {
    expect(pipe.transform(`MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX`).part2).toEqual('9');
  });
});
