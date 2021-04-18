import React from "react"
import { GameInfo } from "../../App"
import { Game } from "../Game/Game"
import { usePlayers } from "../../hooks/usePlayers/usePlayers"
import { Lobby } from "../Lobby/Lobby"
import { Player } from "../../types/lobby"
import { LobbyAction } from "../../components/LobbyAction/LobbyAction"

export function CompositionOfGameAndLobby({
  gameInfo,
}: {
  gameInfo: GameInfo
}) {
  const { players, startGame } = usePlayers(gameInfo)

  return (
    <>
      {startGame ? (
        <Game
          players={removeSelf(players.players, gameInfo.playerName)}
          gameInfo={gameInfo}
        />
      ) : (
        <Lobby players={players} gameInfo={gameInfo} />
      )}

      <LobbyAction gameInfo={gameInfo} />
    </>
  )
}

function removeSelf(players: Player[], playerName: string): Player[] {
  return players.filter((player) => player.name !== playerName)
}
