import {
  Avatar,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"
import { useState } from "react"
import { deepOrange } from "@material-ui/core/colors"
import React from "react"
import { useTransition, animated } from "react-spring"
import { AnimatedCount } from "../AnimatedCount/AnimatedCount"
import { Player } from "../../types/lobby"

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

export function Scoreboard({ players }: { players: Player[] }) {
  const classes = useStyles()
  const height = 60

  //@ts-ignore
  const transition = useTransition(
    players.map((player, i) => ({ ...player, y: i * height })),
    (player) => player.name,
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
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography className={classes.name} noWrap variant="body1">
                  {item.name.toUpperCase()}
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
