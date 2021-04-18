import { useState, useEffect } from "react"
import { GameInfo } from "../../App"
import { LobbyEvents } from "../../consts/events/events"
import { ActionTrigger, LobbyRoomUpdate } from "../../types/lobby"
import { useEventListenerCallback } from "../useEventListenerCallback/useEventListenerCallback"

export function usePlayers(gameInfo: GameInfo) {
  const [players, setPlayers] = useState<LobbyRoomUpdate>({
    isAllReady: false,
    players: [],
  })
  const [startGame, setStartGame] = useState<boolean>(false)
  const [actionTrigger, setActionTrigger] = useState<ActionTrigger>()

  useEventListenerCallback<LobbyRoomUpdate>(
    LobbyEvents.RoomUpdate,
    handleRoomUpdate,
    gameInfo
  )

  function handleRoomUpdate(lobbyRoomUpdate: LobbyRoomUpdate) {
    setPlayers(lobbyRoomUpdate)
    setActionTrigger(lobbyRoomUpdate.actionTrigger)

    if (lobbyRoomUpdate.isAllReady) {
      setStartGame(true)
    }
  }

  return {
    players,
    startGame,
    actionTrigger
  }
}
