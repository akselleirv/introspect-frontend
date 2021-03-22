import { Button, ButtonGroup, Theme, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { GameInfo } from "../../../../App"
import { GameEvents } from "../../../../consts/events/events"
import { useEventSender } from "../../../../hooks/useEventSender/useEventSender"
import { useQuestion } from "../../../../hooks/useQuestions/useQuestions"
import { RegisterSelfVote } from "../../../../types/gameEvents"
import MostVotedIcon from "@material-ui/icons/ExpandLess"
import LeastVotedIcon from "@material-ui/icons/ExpandMore"
import NeutralVotedIcon from "@material-ui/icons/Remove"

export enum SelfVote {
  MostVoted = "Most Voted",
  Neutral = "Neutral",
  LeastVoted = " Least Voted",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: theme.spacing(35),
    },
  })
)

export function DoSelfVoting({ gameInfo }: { gameInfo: GameInfo }) {
  const classes = useStyles()
  const { question, nextQuestion } = useQuestion(gameInfo)
  const { sendEvent } = useEventSender(gameInfo)
  const [disableButton, setDisableButton] = useState<boolean>(false)

  function handleSelfVote(vote: SelfVote) {
    if (question) {
      sendEvent<RegisterSelfVote>(GameEvents.RegisterSelfVote, {
        player: gameInfo.playerName,
        choice: vote,
        question: question,
      })
      setDisableButton(true)
    }
  }

  function mockHandleSelfVote(vote: SelfVote) {}
  return (
    <>
      <Typography variant="h4" align="center">
        {question !== undefined && question.question}
      </Typography>
      <Typography align="center">are you either:</Typography>

      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
        classes={{
          root: classes.button,
        }}
        disabled={disableButton}
      >
        <Button
          style={{ margin: "1rem" }}
          onClick={() => mockHandleSelfVote(SelfVote.MostVoted)}
          startIcon={<MostVotedIcon />}
        >
          {SelfVote.MostVoted}
        </Button>
        <Button
          style={{ margin: "1rem" }}
          onClick={() => handleSelfVote(SelfVote.Neutral)}
          startIcon={<NeutralVotedIcon />}
        >
          {SelfVote.Neutral}
        </Button>
        <Button
          style={{ margin: "1rem" }}
          onClick={() => handleSelfVote(SelfVote.LeastVoted)}
          startIcon={<LeastVotedIcon />}
        >
          {SelfVote.LeastVoted}
        </Button>
      </ButtonGroup>
    </>
  )
}
