import {
  checkWinner,
  isValidMove,
  getAvailableMoves,
  createEmptyBoard,
  type Board,
  type Mark,
} from '../src/utils/game-engine';

describe('createEmptyBoard', () => {
  it('returns array of 9 nulls', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    expect(board.every((cell) => cell === null)).toBe(true);
  });
});

describe('isValidMove', () => {
  it('returns true for empty cell', () => {
    const board = createEmptyBoard();
    expect(isValidMove(board, 0)).toBe(true);
  });

  it('returns false for occupied cell', () => {
    const board = createEmptyBoard();
    board[0] = 'X';
    expect(isValidMove(board, 0)).toBe(false);
  });

  it('returns false for out-of-bounds index', () => {
    const board = createEmptyBoard();
    expect(isValidMove(board, 9)).toBe(false);
    expect(isValidMove(board, -1)).toBe(false);
  });
});

describe('getAvailableMoves', () => {
  it('returns all indices for empty board', () => {
    const board = createEmptyBoard();
    expect(getAvailableMoves(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('returns only empty indices', () => {
    const board: Board = ['X', 'O', null, null, 'X', null, null, null, 'O'];
    expect(getAvailableMoves(board)).toEqual([2, 3, 5, 6, 7]);
  });

  it('returns empty array for full board', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(getAvailableMoves(board)).toEqual([]);
  });
});

describe('checkWinner', () => {
  it('returns null for empty board', () => {
    const board = createEmptyBoard();
    const result = checkWinner(board);
    expect(result.winner).toBeNull();
    expect(result.line).toBeNull();
  });

  it('detects row win', () => {
    const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    const result = checkWinner(board);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 1, 2]);
  });

  it('detects column win', () => {
    const board: Board = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
    const result = checkWinner(board);
    expect(result.winner).toBe('O');
    expect(result.line).toEqual([0, 3, 6]);
  });

  it('detects diagonal win', () => {
    const board: Board = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
    const result = checkWinner(board);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 4, 8]);
  });

  it('detects anti-diagonal win', () => {
    const board: Board = [null, null, 'O', null, 'O', null, 'O', 'X', 'X'];
    const result = checkWinner(board);
    expect(result.winner).toBe('O');
    expect(result.line).toEqual([2, 4, 6]);
  });

  it('detects draw', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    const result = checkWinner(board);
    expect(result.winner).toBe('draw');
    expect(result.line).toBeNull();
  });

  it('returns null for in-progress game', () => {
    const board: Board = ['X', 'O', null, null, 'X', null, null, null, null];
    const result = checkWinner(board);
    expect(result.winner).toBeNull();
    expect(result.line).toBeNull();
  });
});
