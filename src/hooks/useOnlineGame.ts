import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Mark } from '../utils/game-engine';

type OnlineStatus = 'connecting' | 'waiting' | 'playing' | 'disconnected';

interface UseOnlineGameOptions {
  roomCode: string;
  isHost: boolean;
  onOpponentMove: (cell: number) => void;
  onOpponentJoined: () => void;
  onOpponentLeft: () => void;
}

export function useOnlineGame({
  roomCode,
  isHost,
  onOpponentMove,
  onOpponentJoined,
  onOpponentLeft,
}: UseOnlineGameOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [status, setStatus] = useState<OnlineStatus>('connecting');

  useEffect(() => {
    if (!roomCode) return;

    const channel = supabase.channel(`room:${roomCode}`, {
      config: {
        presence: { key: isHost ? 'host' : 'guest' },
      },
    });

    channel
      .on('presence', { event: 'join' }, () => {
        const hasHost = channel.presenceState()['host'];
        const hasGuest = channel.presenceState()['guest'];
        if (hasHost && hasGuest) {
          setStatus('playing');
          onOpponentJoined();
        }
      })
      .on('presence', { event: 'leave' }, () => {
        setStatus('disconnected');
        onOpponentLeft();
      })
      .on('broadcast', { event: 'move' }, ({ payload }) => {
        onOpponentMove(payload.cell);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online: true });
          setStatus('waiting');
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [roomCode, isHost, onOpponentMove, onOpponentJoined, onOpponentLeft]);

  const sendMove = useCallback(
    (cell: number, player: Mark) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'move',
        payload: { cell, player },
      });
    },
    [],
  );

  return { status, sendMove };
}
