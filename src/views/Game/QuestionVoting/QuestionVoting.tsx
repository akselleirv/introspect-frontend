import Grid from "@material-ui/core/Grid"
import { GridSpacing } from "@material-ui/core/Grid"
import { createStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useState, useEffect } from "react"
import { GameInfo } from "../../../App"
import { PlayerButton } from "../../../components/PlayerButton/PlayerButton"
import { PlayerGrid } from "../../../components/PlayerGrid/PlayerGrid"
import { GameEvents, PlayerInfo } from "../../../consts/events/events"
import { useEventListener } from "../../../hooks/useEventListener/useEventListener"
import { useEventListenerCallback } from "../../../hooks/useEventListenerCallback/useEventListenerCallback"
import { useEventSender } from "../../../hooks/useEventSender/useEventSender"
import { useQuestion } from "../../../hooks/useQuestions/useQuestions"
import { PlayerVotedOnQuestion, Vote } from "../../../types/gameEvents"
import { Player } from "../../../types/lobby"

const MAX_VOTES_PER_ROUND = 2

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    players: {
      position: "fixed",
      top: theme.spacing(50),
    },
    header: {
      position: "fixed",
      top: "10%",
    },
  })
)

export function QuestionVoting({
  players,
  gameInfo,
}: {
  players: Player[]
  gameInfo: GameInfo
}) {
  const classes = useStyles()
  const { question, nextQuestion } = useQuestion(gameInfo)
  const { sendEvent } = useEventSender(gameInfo)
  const [votes, setVotes] = useState<Vote[]>([])
  useEventListenerCallback(
    () => {
      setDisableVoting(false)
      nextQuestion()
    },
    GameEvents.NextQuestion,
    gameInfo
  )
  const [disableVoting, setDisableVoting] = useState<boolean>(false)

  function handlePlayerVote(playerReceiver: string): void {
    if (question !== undefined) {
      const allVotes: Vote[] = [
        ...votes,
        {
          playerWhoReceivedTheVote: playerReceiver,
          questionID: question.questionID,
        },
      ]
      if (allVotes.length == MAX_VOTES_PER_ROUND) {
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
      <Typography variant="h4" align="center" className={classes.header}>
        {question !== undefined && question.question}
      </Typography>
      <PlayerGrid
        players={players}
        gridStyle={classes.players}
        actionHandler={handlePlayerVote}
        disableButtons={disableVoting}
      />
    </>
  )
}
