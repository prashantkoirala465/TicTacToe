import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Board } from '../../src/components/Board';
import { PlayerBar } from '../../src/components/PlayerBar';
import { ScoreBar } from '../../src/components/ScoreBar';
import { WinLine } from '../../src/components/WinLine';
import { GameOverOverlay } from '../../src/components/GameOverOverlay';
import { useGameStore } from '../../src/store/game-store';
import { useOnlineGame } from '../../src/hooks/useOnlineGame';
import { onCellTap, onWin, onDraw } from '../../src/lib/feedback';
import { colors, spacing, typography } from '../../src/constants/theme';

export default function OnlineGameScreen() {
  const router = useRouter();
  const { code, host } = useLocalSearchParams<{ code: string; host: string }>();
  const isHost = host === '1';
  const myMark = isHost ? 'X' : 'O';

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

  const handleOpponentMove = useCallback(
    (cell: number) => {
      makeMove(cell);
    },
    [makeMove],
  );

  const handleOpponentJoined = useCallback(() => {}, []);

  const handleOpponentLeft = useCallback(() => {
    Alert.alert('Opponent Left', 'Your opponent disconnected.', [
      { text: 'Back to Menu', onPress: () => router.dismissAll() },
    ]);
  }, [router]);

  const { status, sendMove } = useOnlineGame({
    roomCode: code || '',
    isHost,
    onOpponentMove: handleOpponentMove,
    onOpponentJoined: handleOpponentJoined,
    onOpponentLeft: handleOpponentLeft,
  });

  useEffect(() => {
    if (winner === 'draw') {
      onDraw();
    } else if (winner) {
      onWin();
    }
  }, [winner]);

  const handleCellPress = useCallback(
    (index: number) => {
      if (currentPlayer !== myMark) return;
      const moved = makeMove(index);
      if (moved) {
        onCellTap();
        sendMove(index, myMark);
      }
    },
    [makeMove, currentPlayer, myMark, sendMove],
  );

  const isMyTurn = currentPlayer === myMark;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {status === 'disconnected' ? null : (
          <>
            <PlayerBar
              currentPlayer={currentPlayer}
              scores={scores}
              playerXName={isHost ? 'You' : 'Opponent'}
              playerOName={isHost ? 'Opponent' : 'You'}
            />

            <View
              onLayout={(e) => setBoardSize(e.nativeEvent.layout.width)}
              style={styles.boardContainer}
            >
              <Board
                board={board}
                onCellPress={handleCellPress}
                disabled={!!winner || !isMyTurn}
              />
              <WinLine line={winLine} boardSize={boardSize} />
            </View>

            <ScoreBar scores={scores} />

            {!isMyTurn && !winner && (
              <Text style={styles.waitingText}>Opponent's turn...</Text>
            )}
          </>
        )}
      </View>

      {winner && (
        <GameOverOverlay
          winner={winner}
          playerXName={isHost ? 'You' : 'Opponent'}
          playerOName={isHost ? 'Opponent' : 'You'}
          onPlayAgain={resetBoard}
          onExit={() => router.dismissAll()}
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
  waitingText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
