import { Player } from "../../types/lobby"
import { GameInfo } from "../../App"
import { QuestionVoting } from "./QuestionVoting/QuestionVoting"
import React, { useState } from "react"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { GameEvents } from "../../consts/events/events"
import { SelfVoting } from "./SelfVoting/SelfVoting"

export function Game({
  players,
  gameInfo,
}: {
  players: Player[]
  gameInfo: GameInfo
}) {
  const [isSelfVoting, setIsSelfVoting] = useState<boolean>(false)
  useEventListenerCallback(
    () => setIsSelfVoting(true),
    GameEvents.IsSelfVote,
    gameInfo
  )
  return (
    <>
      {isSelfVoting ? (
        <SelfVoting players={players} gameInfo={gameInfo}/>
      ) : (
        <QuestionVoting players={players} gameInfo={gameInfo} />
      )}
    </>
  )
}
