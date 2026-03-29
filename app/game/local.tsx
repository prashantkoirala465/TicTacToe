import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Board } from '../../src/components/Board';
import { PlayerBar } from '../../src/components/PlayerBar';
import { ScoreBar } from '../../src/components/ScoreBar';
import { WinLine } from '../../src/components/WinLine';
import { GameOverOverlay } from '../../src/components/GameOverOverlay';
import { useGameStore } from '../../src/store/game-store';
import { onCellTap, onWin, onDraw } from '../../src/lib/feedback';
import { colors, spacing } from '../../src/constants/theme';

export default function LocalGameScreen() {
  const router = useRouter();
  const {
    board,
    currentPlayer,
    winner,
    winLine,
    scores,
    makeMove,
    resetBoard,
  } = useGameStore();

  const [boardSize, setBoardSize] = useState(0);

  useEffect(() => {
    if (winner === 'draw') {
      onDraw();
    } else if (winner) {
      onWin();
    }
  }, [winner]);

  const handleCellPress = useCallback(
    (index: number) => {
      const moved = makeMove(index);
      if (moved) {
        onCellTap();
      }
    },
    [makeMove],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PlayerBar
          currentPlayer={currentPlayer}
          scores={scores}
          playerXName="Player 1"
          playerOName="Player 2"
        />

        <View
          onLayout={(e) => setBoardSize(e.nativeEvent.layout.width)}
          style={styles.boardContainer}
        >
          <Board
            board={board}
            onCellPress={handleCellPress}
            disabled={!!winner}
          />
          <WinLine line={winLine} boardSize={boardSize} />
        </View>

        <ScoreBar scores={scores} />
      </View>

      {winner && (
        <GameOverOverlay
          winner={winner}
          playerXName="Player 1"
          playerOName="Player 2"
          onPlayAgain={resetBoard}
          onExit={() => router.back()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
