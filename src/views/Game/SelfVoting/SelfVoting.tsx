import { Button, ButtonGroup, Theme, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import React from "react"
import { GameInfo } from "../../../App"
import { GameEvents } from "../../../consts/events/events"
import { useEventSender } from "../../../hooks/useEventSender/useEventSender"
import { RegisterSelfVote, Question, SelfVote} from "../../../types/gameEvents"
import MostVotedIcon from "@material-ui/icons/ExpandLess"
import LeastVotedIcon from "@material-ui/icons/ExpandMore"
import NeutralVotedIcon from "@material-ui/icons/Remove"



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: theme.spacing(35),
    },
  })
)

export function SelfVoting({
  question,
  gameInfo,
  disableVoting,
  setDisableVoting,
}: {
  question: Question
  gameInfo: GameInfo
  disableVoting: boolean
  setDisableVoting: (disable: boolean) => void
}) {
  const classes = useStyles()
  const { sendEvent } = useEventSender(gameInfo)

  function handleSelfVote(vote: SelfVote) {
    sendEvent<RegisterSelfVote>(GameEvents.RegisterSelfVote, {
      player: gameInfo.playerName,
      choice: vote,
      question: question,
    })
    setDisableVoting(true)
  }
  return (
    <>
      <Typography variant="h4" align="center">
        {question.question}
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
        disabled={disableVoting}
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
