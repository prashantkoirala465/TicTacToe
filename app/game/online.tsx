import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameBackground } from '../../src/components/GameBackground';
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

  const board = useGameStore((s) => s.board);
  const currentPlayer = useGameStore((s) => s.currentPlayer);
  const winner = useGameStore((s) => s.winner);
  const winLine = useGameStore((s) => s.winLine);
  const scores = useGameStore((s) => s.scores);
  const makeMove = useGameStore((s) => s.makeMove);
  const resetBoard = useGameStore((s) => s.resetBoard);

  const [boardSize, setBoardSize] = useState(0);

  const handleOpponentMove = useCallback(
    (cell: number) => {
      const state = useGameStore.getState();
      if (state.currentPlayer === myMark) return; // Not opponent's turn — ignore
      makeMove(cell);
    },
    [makeMove, myMark],
  );

  const handleOpponentJoined = useCallback(() => {}, []);

  const handleOpponentLeft = useCallback(() => {
    Alert.alert('Opponent Left', 'Your opponent disconnected.', [
      { text: 'Back to Menu', onPress: () => router.dismissAll() },
    ]);
  }, [router]);

  const handleOpponentReset = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  const { status, sendMove, sendReset } = useOnlineGame({
    roomCode: code || '',
    isHost,
    onOpponentMove: handleOpponentMove,
    onOpponentJoined: handleOpponentJoined,
    onOpponentLeft: handleOpponentLeft,
    onOpponentReset: handleOpponentReset,
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
    <GameBackground>
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
                <WinLine line={winLine} boardSize={boardSize} winner={winner === 'draw' ? null : winner} />
              </View>

              <ScoreBar scores={scores} />

              {!isMyTurn && !winner && (
                <Text style={styles.waitingText}>Opponent's turn...</Text>
              )}
            </>
          )}
        </View>
      </SafeAreaView>

      {winner && (
        <GameOverOverlay
          winner={winner}
          playerXName={isHost ? 'You' : 'Opponent'}
          playerOName={isHost ? 'Opponent' : 'You'}
          onPlayAgain={() => { resetBoard(); sendReset(); }}
          onExit={() => router.dismissAll()}
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
    marginBottom: 0,
  },
  waitingText: {
    ...typography.caption,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
