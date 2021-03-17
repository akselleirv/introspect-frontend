import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { GameInfo } from "../../App";
import { consts } from "../../consts/consts";
import { LobbyRoomUpdate } from "../../types/lobby";
import { RoomEventsLobby } from "../../types/roomEvent";

export function usePlayers(gameInfo: GameInfo) {
  const { lastMessage } = useWebSocket(consts().websocketUrl(gameInfo), {
    share: true,
  });

  const [players, setPlayers] = useState<LobbyRoomUpdate>({
    isAllReady: false,
    players: [],
  });
  const [startGame, setStartGame] = useState<boolean>(false);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      if (message.event === RoomEventsLobby.RoomUpdate) {
        delete message["event"];
        if (message.isAllReady) {
          setPlayers(message);
          setStartGame(true);
        } else {
          setPlayers(message);
        }
      }
    }
  }, [lastMessage]);

  return {
    players,
    startGame,
  };
}
