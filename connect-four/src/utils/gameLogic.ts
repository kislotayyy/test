import { Player, Winner, Position } from '../types/game.types';

const ROWS = 6;
const COLS = 7;
const WIN_LENGTH = 4;

export const checkWinner = (
  board: (Player | null)[][], 
  row: number, 
  col: number
): Winner | null => {
  const player = board[row][col];
  if (!player) return null;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1]
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    const positions: Position[] = [{ row, column: col }];
    for (let i = 1; i < WIN_LENGTH; i++) {
      const newRow = row + dx * i;
      const newCol = col + dy * i;
      
      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        board[newRow][newCol] === player
      ) {
        count++;
        positions.push({ row: newRow, column: newCol });
      } else {
        break;
      }
    }
    for (let i = 1; i < WIN_LENGTH; i++) {
      const newRow = row - dx * i;
      const newCol = col - dy * i;
      
      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        board[newRow][newCol] === player
      ) {
        count++;
        positions.push({ row: newRow, column: newCol });
      } else {
        break;
      }
    }

    if (count >= WIN_LENGTH) {
      return {
        player,
        positions: positions.slice(0, WIN_LENGTH)
      };
    }
  }

  return null;
};

export const isBoardFull = (board: (Player | null)[][]): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};