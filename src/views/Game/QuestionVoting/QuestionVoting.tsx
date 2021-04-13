import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { GameInfo } from "../../../App"
import { PlayerButton } from "../../../components/PlayerButton/PlayerButton"
import { GameEvents } from "../../../consts/events/events"
import { useEventSender } from "../../../hooks/useEventSender/useEventSender"
import {
  PlayerVotedOnQuestion,
  Question,
  Vote,
} from "../../../types/gameEvents"
import { Player } from "../../../types/lobby"
import styles from "./QuestionVoting.module.scss"

const MAX_VOTES_PER_ROUND = 2

export function QuestionVoting({
  players,
  gameInfo,
  question,
  disableVoting,
  setDisableVoting,
}: {
  players: Player[]
  gameInfo: GameInfo
  question: Question
  disableVoting: boolean
  setDisableVoting: (disable: boolean) => void
}) {
  const { sendEvent } = useEventSender(gameInfo)
  const [votes, setVotes] = useState<Vote[]>([])

  function handlePlayerVote(playerReceiver: string): void {
    if (question !== undefined) {
      const allVotes: Vote[] = [
        ...votes,
        {
          playerWhoReceivedTheVote: playerReceiver,
          questionID: question.questionID,
        },
      ]
      if (allVotes.length === MAX_VOTES_PER_ROUND) {
        sendEvent<PlayerVotedOnQuestion>(GameEvents.PlayerVotedOnQuestion, {
          player: gameInfo.playerName,
          votes: allVotes,
        })
        setVotes([])
        setDisableVoting(true)
      } else {
        setVotes(allVotes)
      }
    }
  }

  return (
    <>
      <Typography variant="h4" align="center">
        {question !== undefined && question.question}
      </Typography>
      <div className={styles.containerTwoFraction}>
        {players.map((p) => (
          <PlayerButton
            key={p.name}
            name={p.name}
            actionHandler={handlePlayerVote}
            disabled={disableVoting}
          />
        ))}
      </div>
    </>
  )
}
