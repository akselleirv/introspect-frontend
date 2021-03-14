import React, { useCallback, useEffect, useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { GameInfo } from "../App";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { consts } from "../consts/consts";
import { ActivePlayers } from "./ActivePlayers/ActivePlayers";
import { Chat } from "./Chat/Chat";
import { Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";



export type Message = { message: string; player: string };

export function Lobby({ gameInfo }: { gameInfo: GameInfo }) {
  const { lastMessage, readyState, sendJsonMessage } = useWebSocket(
    consts().websocketUrl(gameInfo),
    {
      share: true,
    }
  );
  const [activePlayers, setActivePlayers] = useState<string[]>([]);
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
      if (message.event === "active_players") {
        setActivePlayers(message.players);
      }
      if (message.event === "lobby_chat") {
        setMessages((prevMessages) => prevMessages.concat(message));
      }
      if(message.event === "lobby_player_ready"){

      }
    }
  }, [lastMessage]);

  const handleSend = useCallback(
    (message: string) =>
      message &&
      sendJsonMessage({
        event: "lobby_chat",
        player: gameInfo.playerName,
        message: message,
      }),
    []
  );

  function handlePlayerReady(){
    sendJsonMessage({
        event:"lobby_player_ready",
        player: gameInfo.playerName,
    })
  }

  return (
    <>
      <Typography variant="h3">Room: {gameInfo.roomName}</Typography>
      <span>The WebSocket is currently {connectionStatus}</span>
      <ActivePlayers players={activePlayers} />

      <Button onClick={handlePlayerReady} color="primary" variant="outlined">
        Ready To Play
      </Button>

      <Chat handleSend={handleSend} messages={messages} />
    </>
  );
}
