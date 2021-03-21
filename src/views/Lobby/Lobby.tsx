import React, { useCallback, useEffect, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { GameInfo } from "../../App"
import { ActivePlayers } from "./ActivePlayers/ActivePlayers"
import { Chat } from "./Chat/Chat"
import { Button } from "@material-ui/core"
import { LobbyRoomUpdate } from "../../types/lobby"
import { LobbyEvents, ChatMessage, PlayerInfo } from "../../consts/events/events"
import { useEventListener } from "../../hooks/useEventListener/useEventListener"
import { useEventSender } from "../../hooks/useEventSender/useEventSender"

export type Message = { message: string; player: string }

export function Lobby({
  gameInfo,
  players,
}: {
  gameInfo: GameInfo
  players: LobbyRoomUpdate
}) {
  const { eventMessage: chatMessage } = useEventListener<ChatMessage>(
    LobbyEvents.Chat,
    gameInfo
  )
  const [messages, setMessages] = useState<Message[]>([])
  const { sendEvent } = useEventSender(gameInfo)

  useEffect(() => {
    chatMessage !== undefined &&
      setMessages((prevMessages) => prevMessages.concat(chatMessage))
  }, [chatMessage])

  const handleSend = useCallback(
    (message: string) =>
      message &&
      sendEvent<ChatMessage>(LobbyEvents.Chat, {
        player: gameInfo.playerName,
        message: message,
      }),
    [gameInfo.playerName, sendEvent]
  )

  function handlePlayerReady() {
    sendEvent<PlayerInfo>(LobbyEvents.PlayerReady, {
      player: gameInfo.playerName,
    })
  }

  return (
    <>
      <Typography variant="h3">Room: {gameInfo.roomName}</Typography>
      <ActivePlayers players={players.players} />

      <Button onClick={handlePlayerReady} color="primary" variant="contained">
        Ready To Play
      </Button>

      <Chat handleSend={handleSend} messages={messages} />
    </>
  )
}
