import {
  type Board,
  type Mark,
  checkWinner,
  getAvailableMoves,
} from './game-engine';

type Difficulty = 'easy' | 'medium' | 'hard';

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiMark: Mark,
): number {
  const opponentMark: Mark = aiMark === 'X' ? 'O' : 'X';
  const result = checkWinner(board);

  if (result.winner === aiMark) return 10 - depth;
  if (result.winner === opponentMark) return depth - 10;
  if (result.winner === 'draw') return 0;

  const moves = getAvailableMoves(board);

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of moves) {
      board[move] = aiMark;
      best = Math.max(best, minimax(board, depth + 1, false, aiMark));
      board[move] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      board[move] = opponentMark;
      best = Math.min(best, minimax(board, depth + 1, true, aiMark));
      board[move] = null;
    }
    return best;
  }
}

function getBestMove(board: Board, aiMark: Mark): number {
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return -1; // Should never happen, defensive guard
  let bestScore = -Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    board[move] = aiMark;
    const score = minimax(board, 0, false, aiMark);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function getRandomMove(board: Board): number {
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return -1;
  return moves[Math.floor(Math.random() * moves.length)];
}

export function getAiMove(
  board: Board,
  aiMark: Mark,
  difficulty: Difficulty,
): number {
  const boardCopy = [...board];

  switch (difficulty) {
    case 'easy':
      return getRandomMove(boardCopy);
    case 'medium':
      return Math.random() < 0.5
        ? getBestMove(boardCopy, aiMark)
        : getRandomMove(boardCopy);
    case 'hard':
      return getBestMove(boardCopy, aiMark);
  }
}
