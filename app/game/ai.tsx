import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Board } from '../../src/components/Board';
import { PlayerBar } from '../../src/components/PlayerBar';
import { ScoreBar } from '../../src/components/ScoreBar';
import { WinLine } from '../../src/components/WinLine';
import { GameOverOverlay } from '../../src/components/GameOverOverlay';
import { DifficultyPicker } from '../../src/components/DifficultyPicker';
import { useGameStore, type Difficulty } from '../../src/store/game-store';
import { getAiMove } from '../../src/utils/ai';
import { onCellTap, onWin, onDraw } from '../../src/lib/feedback';
import { colors, spacing } from '../../src/constants/theme';

export default function AiGameScreen() {
  const router = useRouter();
  const board = useGameStore((s) => s.board);
  const currentPlayer = useGameStore((s) => s.currentPlayer);
  const winner = useGameStore((s) => s.winner);
  const winLine = useGameStore((s) => s.winLine);
  const scores = useGameStore((s) => s.scores);
  const difficulty = useGameStore((s) => s.difficulty);
  const makeMove = useGameStore((s) => s.makeMove);
  const resetBoard = useGameStore((s) => s.resetBoard);
  const setDifficulty = useGameStore((s) => s.setDifficulty);

  const [boardSize, setBoardSize] = useState(0);
  const [showPicker, setShowPicker] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);

  // AI plays as O
  useEffect(() => {
    if (currentPlayer === 'O' && !winner && !showPicker) {
      setAiThinking(true);
      const delay = 300 + Math.random() * 500;
      const timer = setTimeout(() => {
        const currentBoard = useGameStore.getState().board;
        const move = getAiMove([...currentBoard], 'O', difficulty);
        makeMove(move);
        setAiThinking(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, showPicker, board, difficulty, makeMove]);

  useEffect(() => {
    if (winner === 'draw') {
      onDraw();
    } else if (winner) {
      onWin();
    }
  }, [winner]);

  const handleCellPress = useCallback(
    (index: number) => {
      if (currentPlayer !== 'X' || aiThinking) return;
      const moved = makeMove(index);
      if (moved) {
        onCellTap();
      }
    },
    [makeMove, currentPlayer, aiThinking],
  );

  const handleDifficultySelect = (d: Difficulty) => {
    setDifficulty(d);
    setShowPicker(false);
    resetBoard();
  };

  const handlePlayAgain = () => {
    resetBoard();
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PlayerBar
            currentPlayer={currentPlayer}
            scores={scores}
            playerXName="You"
            playerOName="Computer"
          />

          <View
            onLayout={(e) => setBoardSize(e.nativeEvent.layout.width)}
            style={styles.boardContainer}
          >
            <Board
              board={board}
              onCellPress={handleCellPress}
              disabled={!!winner || currentPlayer === 'O' || aiThinking}
            />
            <WinLine line={winLine} boardSize={boardSize} winner={winner === 'draw' ? null : winner} />
          </View>

          <ScoreBar scores={scores} />
        </View>
      </SafeAreaView>

      <DifficultyPicker
        visible={showPicker}
        onSelect={handleDifficultySelect}
        onClose={() => router.back()}
      />

      {winner && (
        <GameOverOverlay
          winner={winner}
          playerXName="You"
          playerOName="Computer"
          onPlayAgain={handlePlayAgain}
          onExit={() => router.back()}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  boardContainer: {
    position: 'relative',
    marginBottom: spacing.xxl,
  },
});
