import React, { useState } from "react"
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
import LanguageIcon from "@material-ui/icons/Language"
import { Language } from "../CompositionOfGameAndLobby/CompositionOfGameAndLobby"
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer"
import Fab from "@material-ui/core/Fab"
import SpeedDial from "@material-ui/lab/SpeedDial"
import SpeedDialAction from "@material-ui/lab/SpeedDialAction"
import { AddQuestion } from "../../components/AddQuestion/AddQuestion"
import { makeStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"

export type Message = { message: string; player: string }
const recommendedMinPlayers = 3

export function Lobby({
  gameInfo,
  players,
  language,
  setLanguage,
}: {
  gameInfo: GameInfo
  players: LobbyRoomUpdate
  language: Language
  setLanguage: (language: Language) => void
}) {
  const [openAddQuestion, setOpenAddQuestion] = useState(false)
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
      <Typography variant="h3">{gameInfo.roomName}</Typography>
      <ActivePlayers players={players.players} />

      <Button
        onClick={handlePlayerReady}
        color="primary"
        endIcon={<SendIcon />}
        variant="contained"
      >
        Ready To Play
      </Button>

      <div className={styles.options}>
        <span>
          <QuestionLanguageSelect
            language={language}
            setLanguage={setLanguage}
          />
        </span>
        <span>
          <Fab
            color="primary"
            aria-label="add question"
            onClick={() => setOpenAddQuestion(true)}
          >
            <QuestionAnswerIcon />
          </Fab>
        </span>
      </div>

      <AddQuestion
        open={openAddQuestion}
        onClose={() => setOpenAddQuestion(false)}
      />
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

const useStyles = makeStyles({
  choosenLanguage: {
    backgroundColor: green[100],
  },
})

function QuestionLanguageSelect({
  language,
  setLanguage,
}: {
  language: Language
  setLanguage: (language: Language) => void
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClose = (newLang: Language) => {
    setOpen(false)
    setLanguage(newLang)
  }

  return (
    <SpeedDial
      ariaLabel="choose language"
      icon={<LanguageIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction={"left"}
    >
      <SpeedDialAction
        icon={<span>NO</span>}
        onClick={() => handleClose(Language.no)}
        tooltipTitle="Norsk"
        className={language === Language.no ? classes.choosenLanguage : ""}
      />
      <SpeedDialAction
        icon={<span>EN</span>}
        onClick={() => handleClose(Language.en)}
        tooltipTitle="English"
        className={language === Language.en ? classes.choosenLanguage : ""}
      />
    </SpeedDial>
  )
}
