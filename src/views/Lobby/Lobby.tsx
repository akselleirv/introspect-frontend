import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"
import { GameInfo } from "../../App"
import { ActivePlayers } from "./ActivePlayers/ActivePlayers"
import { Button, Snackbar } from "@material-ui/core"
import { LobbyRoomUpdate } from "../../types/lobby"
import {
  LobbyEvents,
  PlayerInfo,
} from "../../consts/events/events"
import { useEventSender } from "../../hooks/useEventSender/useEventSender"
import styles from "./Lobby.module.scss"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

export type Message = { message: string; player: string }
const recommendedMinPlayers = 3

export function Lobby({
  gameInfo,
  players,
}: {
  gameInfo: GameInfo
  players: LobbyRoomUpdate
}) {
  const [alertUnderMinPlayers, setAlertUnderMinPlayers] = useState<boolean>(
    false
  )
  const { sendEvent } = useEventSender(gameInfo)

  function handlePlayerReady() {
    if (players.players.length >= recommendedMinPlayers) {
      sendEvent<PlayerInfo>(LobbyEvents.PlayerReady, {
        player: gameInfo.playerName,
      })
    } else {
      setAlertUnderMinPlayers(true)
    }
  }
  const handleAlertUnderMinPlayersClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setAlertUnderMinPlayers(false)
  }

  return (
    <div className={styles.containerLobby}>
      <Typography variant="h3">Room: {gameInfo.roomName}</Typography>
      <ActivePlayers players={players.players} />

      <Button
        className={styles.button}
        onClick={handlePlayerReady}
        color="primary"
        variant="contained"
      >
        Ready To Play
      </Button>

      <Snackbar
        open={alertUnderMinPlayers}
        autoHideDuration={4000}
        onClose={handleAlertUnderMinPlayersClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertUnderMinPlayersClose} severity="warning">
          You need {recommendedMinPlayers - players.players.length} more to play 😢 😢<br/>
          Invite your friends to join the '{gameInfo.roomName} ' room
        </Alert>
      </Snackbar>
    </div>
  )
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
