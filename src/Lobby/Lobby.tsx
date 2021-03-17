import React, { useCallback, useEffect, useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { GameInfo } from "../App";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { consts } from "../consts/consts";
import { ActivePlayers } from "./ActivePlayers/ActivePlayers";
import { Chat } from "./Chat/Chat";
import { Button } from "@material-ui/core";
import { RoomEventsLobby } from "../types/roomEvent";
import { LobbyRoomUpdate } from "../types/lobby";

export type Message = { message: string; player: string };

export function Lobby({
  gameInfo,
  players,
}: {
  gameInfo: GameInfo;
  players: LobbyRoomUpdate;
}) {
  const { lastMessage, readyState, sendJsonMessage } = useWebSocket(
    consts().websocketUrl(gameInfo),
    {
      share: true,
    }
  );

  const [messages, setMessages] = useState<Message[]>([]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      if (message.event === RoomEventsLobby.Chat) {
        setMessages((prevMessages) => prevMessages.concat(message));
      }
    }
  }, [lastMessage]);

  const handleSend = useCallback(
    (message: string) =>
      message &&
      sendJsonMessage({
        event: RoomEventsLobby.Chat,
        player: gameInfo.playerName,
        message: message,
      }),
    []
  );

  function handlePlayerReady() {
    sendJsonMessage({
      event: RoomEventsLobby.PlayerReady,
      player: gameInfo.playerName,
    });
  }

  return (
    <>
      <Typography variant="h3">Room: {gameInfo.roomName}</Typography>
      <span>The WebSocket is currently {connectionStatus}</span>
      <ActivePlayers players={players.players} />

      <Button onClick={handlePlayerReady} color="primary" variant="outlined">
        Ready To Play
      </Button>

      <Chat handleSend={handleSend} messages={messages} />
    </>
  );
}
