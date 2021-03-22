import {
  Avatar,
  Button,
  createStyles,
  Divider,
  List,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"
import { useState, useRef } from "react"
import { deepOrange } from "@material-ui/core/colors"
import React from "react"
import { Player } from "../../../../types/lobby"

import {
  useTransition,
  animated,
  useChain,
} from "react-spring"
import { AnimatedCount } from "../../../../components/AnimatedCount/AnimatedCount"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: "flex",
      flexDirection: "column",
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

export function DisplaySelfVoteResult({ players }: { players: Player[] }) {
  const classes = useStyles()
  const height = 60

  const pointsCountingRef = useRef<any>()
  const reorderListRef = useRef<any>()
  //@ts-ignore
  //useChain([pointsCountingRef, reorderListRef])

  const [mockedPlayers, setMockedPlayers] = useState([
    { name: "Player AA", isReady: true, points: 0 },
    { name: "Player BB", isReady: true, points: 0 },
    { name: "Player CC", isReady: true, points: 0 },
    { name: "Player DD", isReady: true, points: 0 },
    { name: "Player EE", isReady: true, points: 0 },
  ])

  //@ts-ignore
  const transition = useTransition(
    mockedPlayers.map((player, i) => ({ ...player, y: i * height })),
    (player) => player.name,
    {
      from: { position: "absolute" },
      enter: ({ y }) => ({ y }),
      update: ({ y }) => ({ y }),
      //ref: reorderListRef,
    }
  )

  function updatePointsEvent() {
    setMockedPlayers((prev) =>
      prev
        .map((p) => ({
          name: p.name,
          isReady: p.isReady,
          points: p.points === 0 ? Math.random() * 10 : 0,
        }))
        .sort((p1, p2) => p2.points - p1.points)
    )
  }

  return (
    <>
      <button onClick={updatePointsEvent}>trigger points update</button>
      <h1>display self vote result</h1>
      <List className={classes.list}>
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
                  <AnimatedCount
                    animationRef={pointsCountingRef}
                    points={item.points}
                  />
                </Typography>
              </div>
            </Button>
          </animated.div>
        ))}
      </List>
    </>
  )
}

//transform: "translate3d(0,-40px,0)"
