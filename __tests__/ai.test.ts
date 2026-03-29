import { getAiMove } from '../src/utils/ai';
import { createEmptyBoard, checkWinner, type Board } from '../src/utils/game-engine';

describe('getAiMove', () => {
  describe('easy', () => {
    it('returns a valid move index', () => {
      const board = createEmptyBoard();
      const move = getAiMove(board, 'O', 'easy');
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(9);
      expect(board[move]).toBeNull();
    });

    it('returns the only available move', () => {
      const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
      const move = getAiMove(board, 'O', 'easy');
      expect(move).toBe(8);
    });
  });

  describe('hard', () => {
    it('blocks opponent from winning', () => {
      const board: Board = ['X', 'X', null, 'O', null, null, null, null, null];
      const move = getAiMove(board, 'O', 'hard');
      expect(move).toBe(2);
    });

    it('takes winning move when available', () => {
      const board: Board = ['X', 'X', null, 'O', 'O', null, null, null, 'X'];
      const move = getAiMove(board, 'O', 'hard');
      expect(move).toBe(5);
    });

    it('never loses when playing a full game', () => {
      for (let g = 0; g < 100; g++) {
        const board = createEmptyBoard();
        let currentPlayer: 'X' | 'O' = 'X';

        while (checkWinner(board).winner === null) {
          if (currentPlayer === 'O') {
            const move = getAiMove(board, 'O', 'hard');
            board[move] = 'O';
          } else {
            const available = board.reduce<number[]>((acc, c, i) => {
              if (c === null) acc.push(i);
              return acc;
            }, []);
            const move = available[Math.floor(Math.random() * available.length)];
            board[move] = 'X';
          }
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        const result = checkWinner(board);
        expect(result.winner).not.toBe('X');
      }
    });
  });

  describe('medium', () => {
    it('returns a valid move', () => {
      const board = createEmptyBoard();
      const move = getAiMove(board, 'O', 'medium');
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(9);
      expect(board[move]).toBeNull();
    });
  });
});
