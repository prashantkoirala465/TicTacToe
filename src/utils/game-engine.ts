export type Mark = 'X' | 'O';
export type Cell = Mark | null;
export type Board = Cell[];

export interface WinResult {
  winner: Mark | 'draw' | null;
  line: [number, number, number] | null;
}

const WIN_LINES: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function isValidMove(board: Board, index: number): boolean {
  return index >= 0 && index < 9 && board[index] === null;
}

export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, i) => {
    if (cell === null) moves.push(i);
    return moves;
  }, []);
}

export function checkWinner(board: Board): WinResult {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Mark, line };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'draw', line: null };
  }
  return { winner: null, line: null };
}
