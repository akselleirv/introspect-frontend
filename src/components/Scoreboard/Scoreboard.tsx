import {
  Avatar,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { deepOrange } from "@material-ui/core/colors"
import React from "react"
import { useTransition, animated } from "react-spring"
import { AnimatedCount } from "../AnimatedCount/AnimatedCount"
import { Player } from "../../types/lobby"
import { PlayerResult } from "../../types/gameEvents"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      position: "absolute",
      top: "10%",
    },
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    name: {
      paddingLeft: theme.spacing(1),
    },
    button: {
      width: theme.spacing(34),
      backgroundColor: "white",
      padding: "5px",
      margin: "5px",
    },
    buttonContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      textAlign: "center",
    },
  })
)

export function Scoreboard({
  allRoundsResultExpectLastRound,
  allRoundsResult,
}: {
  allRoundsResultExpectLastRound: PlayerResult[]
  allRoundsResult: PlayerResult[]
}) {
  const classes = useStyles()
  const height = 60

  const [players, setPlayers] = useState<PlayerResult[]>(
    sortPlayersByPointsAsc(allRoundsResultExpectLastRound)
  )

  function sortPlayersByPointsAsc(players: PlayerResult[]): PlayerResult[] {
    return players.sort((p1, p2) => p2.points - p1.points)
  }

  const timer = setTimeout(() => {
    setPlayers(sortPlayersByPointsAsc(allRoundsResult))
    clearTimeout(timer)
  }, 1500)

  //@ts-ignore
  const transition = useTransition(
    players.map((player, i) => ({ ...player, y: i * height })),
    (player) => player.player,
    {
      from: { position: "absolute" },
      enter: ({ y }) => ({ y }),
      update: ({ y }) => ({ y }),
    }
  )

  return (
    <>
      <div className={classes.list}>
        <Typography variant="h2">Scoreboard</Typography>
        {/*@ts-ignore */}
        {transition.map(({ item, props: { y, ...rest }, key }) => (
          <animated.div
            key={key}
            style={{
              //@ts-ignore
              transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
              ...rest,
            }}
          >
            <Button variant="contained" className={classes.button}>
              <div className={classes.buttonContent}>
                <Avatar className={classes.avatar}>
                  {item.player.charAt(0).toUpperCase()}
                </Avatar>
                <Typography className={classes.name} noWrap variant="body1">
                  {item.player.toUpperCase()}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: 10 }}
                />
                <Typography className={classes.name} noWrap variant="body1">
                  <AnimatedCount points={item.points} />
                </Typography>
              </div>
            </Button>
          </animated.div>
        ))}
      </div>
    </>
  )
}
