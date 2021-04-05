import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React from "react"
import HowToVoteIcon from "@material-ui/icons/HowToVote"
import { SelfVote, ResultPoints, PlayerResult } from "../../types/gameEvents"

import MostVotedIcon from "@material-ui/icons/ExpandLess"
import LeastVotedIcon from "@material-ui/icons/ExpandMore"
import NeutralVotedIcon from "@material-ui/icons/Remove"
import ErrorIcon from "@material-ui/icons/Error"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.3rem",
      margin: "0.5rem",
    },
    playerInfo: {
      display: "flex",
      alignItems: "center",
      width: "50%",
    },
    name: {
      paddingLeft: "0.2rem",
    },
    item: {
      width: "95%",
    },
    fullPoint: {
      backgroundColor: "#64DD17",
    },
    neutralPoint: {
      backgroundColor: "#E0E0E0",
    },
    nonePoint: {
      backgroundColor: "#f44336",
    },
  })
)

export function QuestionResults({
  playerResults,
}: {
  playerResults: PlayerResult[]
}) {
  return (
    <>
      {playerResults.map(({ player, selfVote, votesReceived, points }) => (
        <StatusEntry
          player={player}
          selfVote={selfVote}
          votesReceived={votesReceived}
          points={points}
        />
      ))}
    </>
  )
}

function StatusEntry({
  player,
  selfVote,
  votesReceived,
  points,
}: PlayerResult) {
  const classes = useStyles()

  function backgroundColorByResultPoint(result: ResultPoints): string {
    const backgroundColors = new Map([
      [ResultPoints.FullPoints, classes.fullPoint],
      [ResultPoints.NeutralPoints, classes.neutralPoint],
      [ResultPoints.NonePoints, classes.nonePoint],
    ])
    const bc = backgroundColors.get(result)
    return bc === undefined ? "" : bc
  }

  return (
    <Grid item className={classes.item}>
      <Paper
        className={`${classes.paperContent} ${backgroundColorByResultPoint(
          points
        )}`}
      >
        <div className={classes.playerInfo}>
          <Avatar>{player.charAt(0).toUpperCase()}</Avatar>
          <Typography noWrap variant="body1" className={classes.name}>
            {player.toUpperCase()}
          </Typography>
        </div>
        <DividerStyled />
        <Typography>
          <SelfVoteIcon selfVote={selfVote} />
        </Typography>
        <DividerStyled />
        <Typography>
          {votesReceived} <HowToVoteIcon />
        </Typography>
      </Paper>
    </Grid>
  )
}

function DividerStyled() {
  return <Divider orientation="vertical" flexItem />
}

function SelfVoteIcon({ selfVote }: { selfVote: SelfVote }) {
  const selfVoteIcons = new Map([
    [SelfVote.MostVoted, MostVotedIcon],
    [SelfVote.Neutral, NeutralVotedIcon],
    [SelfVote.LeastVoted, LeastVotedIcon],
  ])
  const Icon = selfVoteIcons.get(selfVote)
  return Icon === undefined ? <ErrorIcon /> : <Icon />
}
