import React, { ChangeEvent, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { GameInfo } from "../../App"
import { ActivePlayers } from "./ActivePlayers/ActivePlayers"
import { Button, Snackbar } from "@material-ui/core"
import { LobbyRoomUpdate } from "../../types/lobby"
import { LobbyEvents, PlayerInfo } from "../../consts/events/events"
import { useEventSender } from "../../hooks/useEventSender/useEventSender"
import styles from "./Lobby.module.scss"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import SendIcon from "@material-ui/icons/Send"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import LanguageIcon from "@material-ui/icons/Language"
import { Language } from "../CompositionOfGameAndLobby/CompositionOfGameAndLobby"

export type Message = { message: string; player: string }
const recommendedMinPlayers = 3

export function Lobby({
  gameInfo,
  players,
  language,
  setLanguage
}: {
  gameInfo: GameInfo
  players: LobbyRoomUpdate
  language: Language
  setLanguage: (language: Language) => void
}) {
  const [alertUnderMinPlayers, setAlertUnderMinPlayers] =
    useState<boolean>(false)
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
        onClick={handlePlayerReady}
        color="primary"
        endIcon={<SendIcon />}
        variant="contained"
      >
        Ready To Play
      </Button>
      <QuestionLanguageSelect language={language} setLanguage={setLanguage} />

      <Snackbar
        open={alertUnderMinPlayers}
        autoHideDuration={4000}
        onClose={handleAlertUnderMinPlayersClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertUnderMinPlayersClose} severity="warning">
          You need {recommendedMinPlayers - players.players.length} more to play
          😢 😢
          <br />
          Invite your friends to join the '{gameInfo.roomName} ' room
        </Alert>
      </Snackbar>
    </div>
  )
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function QuestionLanguageSelect({
  language,
  setLanguage,
}: {
  language: Language
  setLanguage: (language: Language) => void
}) {
  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={language}
        onChange={(event: ChangeEvent<{ value: unknown }>) =>
          setLanguage(event.target.value as Language)
        }
        label="Language"
        renderValue={(value) => (
          <div className={styles.language}>
            <LanguageIcon /> {value}
          </div>
        )}
      >
        <MenuItem value={Language.no}>{Language.no}</MenuItem>
        <MenuItem value={Language.en}>{Language.en}</MenuItem>
      </Select>
    </FormControl>
  )
}
