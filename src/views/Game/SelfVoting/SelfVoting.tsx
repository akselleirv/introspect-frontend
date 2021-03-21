import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { Theme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { GameInfo } from "../../../App"
import { useQuestion } from "../../../hooks/useQuestions/useQuestions"
import MostVotedIcon from "@material-ui/icons/ExpandLess"
import LeastVotedIcon from "@material-ui/icons/ExpandMore"
import NeutralVotedIcon from "@material-ui/icons/Remove"
import { useEventSender } from "../../../hooks/useEventSender/useEventSender"
import { RegisterSelfVote } from "../../../types/gameEvents"
import { GameEvents } from "../../../consts/events/events"

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

export function SelfVoting({ gameInfo }: { gameInfo: GameInfo }) {
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
          onClick={() => handleSelfVote(SelfVote.MostVoted)}
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
