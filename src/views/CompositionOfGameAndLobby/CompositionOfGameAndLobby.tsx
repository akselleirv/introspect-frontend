import React, { useState } from "react"
import { GameInfo } from "../../App"
import { Game } from "../Game/Game"
import { usePlayers } from "../../hooks/usePlayers/usePlayers"
import { Lobby } from "../Lobby/Lobby"
import { Player } from "../../types/lobby"
import { LobbyAction } from "../../components/LobbyAction/LobbyAction"

export enum Language {
  en = "English",
  no = "Norsk",
}

export function CompositionOfGameAndLobby({
  gameInfo,
}: {
  gameInfo: GameInfo
}) {
  const { players, startGame } = usePlayers(gameInfo)
  const [language, setLanguage] = useState<Language>(Language.no)

  return (
    <>
      {startGame ? (
        <Game
          players={removeSelf(players.players, gameInfo.playerName)}
          gameInfo={gameInfo}
          language={language}
        />
      ) : (
        <Lobby 
          players={players} 
          gameInfo={gameInfo} 
          language={language}
          setLanguage={setLanguage}
          />
      )}

      <LobbyAction gameInfo={gameInfo} />
    </>
  )
}

function removeSelf(players: Player[], playerName: string): Player[] {
  return players.filter((player) => player.name !== playerName)
}
