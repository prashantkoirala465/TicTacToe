import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameBackground } from '../../src/components/GameBackground';
import { Board } from '../../src/components/Board';
import { PlayerBar } from '../../src/components/PlayerBar';
import { ScoreBar } from '../../src/components/ScoreBar';
import { WinLine } from '../../src/components/WinLine';
import { GameOverOverlay } from '../../src/components/GameOverOverlay';
import { useGameStore } from '../../src/store/game-store';
import { onCellTap, onWin, onDraw } from '../../src/lib/feedback';

export default function LocalGameScreen() {
  const router = useRouter();
  const board = useGameStore((s) => s.board);
  const currentPlayer = useGameStore((s) => s.currentPlayer);
  const winner = useGameStore((s) => s.winner);
  const winLine = useGameStore((s) => s.winLine);
  const scores = useGameStore((s) => s.scores);
  const makeMove = useGameStore((s) => s.makeMove);
  const resetBoard = useGameStore((s) => s.resetBoard);

  const [boardSize, setBoardSize] = useState(0);

  useEffect(() => {
    if (winner === 'draw') onDraw();
    else if (winner) onWin();
  }, [winner]);

  const handleCellPress = useCallback(
    (index: number) => {
      const moved = makeMove(index);
      if (moved) onCellTap();
    },
    [makeMove],
  );

  return (
    <GameBackground>
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
            <Board board={board} onCellPress={handleCellPress} disabled={!!winner} />
            <WinLine line={winLine} boardSize={boardSize} winner={winner === 'draw' ? null : winner} />
          </View>

          <ScoreBar scores={scores} />
        </View>
      </SafeAreaView>

      {winner && (
        <GameOverOverlay
          winner={winner}
          playerXName="Player 1"
          playerOName="Player 2"
          onPlayAgain={resetBoard}
          onExit={() => router.back()}
        />
      )}
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  boardContainer: {
    position: 'relative',
  },
});
