import React from "react";
import { PlayerButton } from "../../../components/PlayerButton/PlayerButton";
import { Player } from "../../../types/lobby";
import styles from './ActivePlayers.module.scss'

export function ActivePlayers({ players }: { players: Player[] }) {

  return (
    <div className={styles.containerTwoFraction}>
        {players.map((player) => (
          <PlayerButton
            key={player.name}
            name={player.name}
            extraStyle={
              player.isReady ? { backgroundColor: "greenyellow" } : undefined
            }
          />
        ))}
    </div>
  );
}
