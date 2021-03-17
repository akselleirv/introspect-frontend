import React from "react";
import { GameInfo } from "../App";
import { Game } from "../Game/Game";
import { usePlayers } from "../hooks/usePlayers/usePlayers";
import { Lobby } from "../Lobby/Lobby";

export function CompositionOfGameAndLobby({gameInfo}: {gameInfo: GameInfo}) {
  const { players, startGame } = usePlayers(gameInfo);
  
  return startGame ? (
    <Game players={players.players} />
  ) : (
    <Lobby
      players={players}
      gameInfo={gameInfo}
    />
  );
}
