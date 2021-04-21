import Button from "@material-ui/core/Button"
import React, { useState } from "react"
import { GameInfo } from "../../App"
import { GameEvents } from "../../consts/events/events"
import { useEventSender } from "../../hooks/useEventSender/useEventSender"
import { GenericEvent } from "../../types/gameEvents"
import {
  Scoreboard,
  ScoreboardProps,
  SCOREBOARD_HEIGHT_BETWEEN_EACH_PLAYER,
} from "../Scoreboard/Scoreboard"

export function ScoreboardView({
  gameInfo,
  playersResults,
  playersResultExceptLastRound,
}: ScoreboardProps & { gameInfo: GameInfo }) {
  const [disableButton, setDisableButton] = useState(false)
  const { sendEvent } = useEventSender(gameInfo)
  return (
    <>
      <Scoreboard
        playersResults={playersResults}
        playersResultExceptLastRound={playersResultExceptLastRound}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={disableButton}
        style={{
          top: `${
            50 + SCOREBOARD_HEIGHT_BETWEEN_EACH_PLAYER * playersResults.length
          }px`,
        }}
        onClick={() => {
          sendEvent<GenericEvent>(GameEvents.NextRound, {
            player: gameInfo.playerName,
          })
          setDisableButton(true)
        }}
      >
        Next Round
      </Button>
    </>
  )
}
