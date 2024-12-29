import { Day15Pipe } from './day15.pipe';

describe('Day15Pipe', () => {
  const pipe = new Day15Pipe();

  describe('part 1', () => {
    it('should return 0 for no boxes, no moves', () => {
      expect(pipe.transform(`#######
#......
#......

`).part1).toEqual('0');
    });

    it('should return gps for one box, no moves', () => {
      expect(pipe.transform(`#######
#...O..
#......

`).part1).toEqual('104');
    });

    it('should return gps for one box with moves', () => {
      expect(pipe.transform(`#######
#.@.O..
#......

>>`).part1).toEqual('105');
    });

    it('should return gps for one box with moves stopping at wall', () => {
      expect(pipe.transform(`#######
#.@.O.#
#......

>>>>`).part1).toEqual('105');
    });

    it('should calculate for small example', () => {
      expect(pipe.transform(`########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`).part1).toEqual('2028');
    });

    it('should calculate for larger example', () => {
      expect(pipe.transform(`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`).part1).toEqual('10092');
    })
  });
});
