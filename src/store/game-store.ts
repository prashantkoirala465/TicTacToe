import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createEmptyBoard,
  checkWinner,
  isValidMove,
  type Board,
  type Mark,
} from '../utils/game-engine';

export type GameMode = 'local' | 'ai' | 'online';
export type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  board: Board;
  currentPlayer: Mark;
  winner: Mark | 'draw' | null;
  winLine: number[] | null;
  mode: GameMode;
  difficulty: Difficulty;
  scores: { x: number; o: number; draws: number };
}

interface GameActions {
  makeMove: (index: number) => boolean;
  resetBoard: () => void;
  resetScores: () => void;
  setMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

const initialState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  winLine: null,
  mode: 'local',
  difficulty: 'medium',
  scores: { x: 0, o: 0, draws: 0 },
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      makeMove: (index: number) => {
        const { board, currentPlayer, winner } = get();
        if (winner || !isValidMove(board, index)) return false;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        const result = checkWinner(newBoard);

        set({
          board: newBoard,
          currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
          winner: result.winner,
          winLine: result.line,
        });

        if (result.winner && result.winner !== 'draw') {
          const key = result.winner === 'X' ? 'x' : 'o';
          set((state) => ({
            scores: { ...state.scores, [key]: state.scores[key] + 1 },
          }));
        } else if (result.winner === 'draw') {
          set((state) => ({
            scores: { ...state.scores, draws: state.scores.draws + 1 },
          }));
        }

        return true;
      },

      resetBoard: () => {
        set({
          board: createEmptyBoard(),
          currentPlayer: 'X',
          winner: null,
          winLine: null,
        });
      },

      resetScores: () => {
        set({ scores: { x: 0, o: 0, draws: 0 } });
      },

      setMode: (mode) => {
        set({ ...initialState, mode, scores: get().scores });
      },

      setDifficulty: (difficulty) => {
        set({ difficulty });
      },
    }),
    {
      name: 'tic-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ scores: state.scores }),
    },
  ),
);
