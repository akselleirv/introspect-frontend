import { createStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { GameInfo } from "../../../App"
import { PlayerGrid } from "../../../components/PlayerGrid/PlayerGrid"
import { GameEvents } from "../../../consts/events/events"
import { useEventSender } from "../../../hooks/useEventSender/useEventSender"
import { PlayerVotedOnQuestion, Question, Vote } from "../../../types/gameEvents"
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
  question,
  disableVoting,
  setDisableVoting
}: {
  players: Player[]
  gameInfo: GameInfo
  question: Question
  disableVoting: boolean
  setDisableVoting: (disable: boolean) => void
}) {
  const classes = useStyles()
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
