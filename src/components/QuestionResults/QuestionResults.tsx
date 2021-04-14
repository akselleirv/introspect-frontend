import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import React from "react"
import HowToVoteIcon from "@material-ui/icons/HowToVote"
import {
  SelfVote,
  ResultPoints,
  PlayerResultExtended,
} from "../../types/gameEvents"

import MostVotedIcon from "@material-ui/icons/ExpandLess"
import LeastVotedIcon from "@material-ui/icons/ExpandMore"
import NeutralVotedIcon from "@material-ui/icons/Remove"
import ErrorIcon from "@material-ui/icons/Error"
import styles from "./QuestionResults.module.scss"
import { makeStyles, Theme, createStyles } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  playerResults: PlayerResultExtended[]
}) {
  return (
    <div>
      <Typography variant="h5" align="center">
        Question Result
      </Typography>
      {playerResults
        .sort((p1, p2) => p2.votesReceived - p1.votesReceived)
        .map(({ player, selfVote, votesReceived, points }) => (
          <StatusEntry
            player={player}
            selfVote={selfVote}
            votesReceived={votesReceived}
            points={points}
          />
        ))}
    </div>
  )
}

function StatusEntry({
  player,
  selfVote,
  votesReceived,
  points,
}: PlayerResultExtended) {
  const classes = useStyles()
  function backgroundColorByResultPoint(result: ResultPoints): string {
    const backgroundColors = new Map([
      [ResultPoints.FullPoints, classes.fullPoint],
      [ResultPoints.NeutralPoints, classes.neutralPoint],
      [ResultPoints.NonePoints, classes.nonePoint],
    ])
    const bgColor = backgroundColors.get(result)
    return bgColor === undefined ? "" : bgColor
  }

  return (
    <div className={styles.container}>
      <Paper
        className={`${styles.paperContent} ${backgroundColorByResultPoint(
          points
        )}`}
      >
        <div className={styles.playerInfo}>
          <Avatar>{player.charAt(0).toUpperCase()}</Avatar>
          <Typography noWrap variant="body1" className={styles.name}>
            {player.toUpperCase()}
          </Typography>
        </div>
        <DividerStyled />
        <Typography>
          <SelfVoteIcon selfVote={selfVote} />
        </Typography>
        <DividerStyled />
        <div className={styles.votesReceived}>
          <Typography>{votesReceived}</Typography>
          <HowToVoteIcon />
        </div>
      </Paper>
    </div>
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

