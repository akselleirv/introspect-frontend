import { Button, InputAdornment, TextField } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { ChangeEvent, useState } from "react"
import { GameInfo } from "../../App"
import AccountCircle from "@material-ui/icons/AccountCircle"
import HomeIcon from "@material-ui/icons/Home"
import styles from "./WelcomePage.module.scss"
import axios, { AxiosResponse } from "axios"
import { consts } from "../../consts/consts"

type GameInfoValidation = {
  playerNameAvailable: boolean
  roomIsJoinable: boolean
}

export function WelcomePage({
  setGameInfo,
}: {
  setGameInfo: (gameInfo: GameInfo) => void
}) {
  const [playerName, setPlayerName] = useState("aksel")
  const [roomName, setRoomName] = useState("test")
  const [playerNameError, setPlayerNameError] = useState("")
  const [roomNameError, setRoomNameError] = useState("")

  function handleGameInfoSetter(playerName: string, roomName: string) {
    if (isInputsEmpty(playerName, roomName)) {
      return
    }
    const gameInfo = {
      playerName: playerName,
      roomName: roomName,
    }
    axios
      .get<any, AxiosResponse<GameInfoValidation>>(
        consts().validatePlayerNameUrl(gameInfo)
      )
      .then(({ data: { playerNameAvailable, roomIsJoinable } }) => {
        handleBackendGameInfoValidation(playerNameAvailable, roomIsJoinable)
      })
      .catch((err) => {
        console.log("error occured", err)
      })
  }

  function isInputsEmpty(playerName: string, roomName: string): boolean {
    let isEmpty = false
    if (playerName === "") {
      setPlayerNameError("Player name cannot be empty.")
      isEmpty = true
    } else {
      setPlayerNameError("")
    }

    if (roomName === "") {
      setRoomNameError("Room name cannot be empty.")
      isEmpty = true
    } else {
      setRoomNameError("")
    }
    return isEmpty
  }
  function handleBackendGameInfoValidation(
    playerNameAvailable: boolean,
    roomIsJoinable: boolean
  ) {
    if (playerNameAvailable === true && roomIsJoinable === true) {
      setGameInfo({ playerName, roomName })
      return
    }
    if (playerNameAvailable === false) {
      setPlayerNameError("Player name has already been taken.")
    }
    if (roomIsJoinable === false) {
      setRoomNameError("Game has already started.")
    }
  }

  return (
    <div className={styles.container}>
      <Typography variant="h2" align="center">
        Welcome to Introspect
      </Typography>
      <TextField
        id="outlined-basic-playerName"
        label="Player name"
        variant="outlined"
        error={playerNameError === "" ? false : true}
        helperText={playerNameError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        value={playerName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPlayerName(e.target.value)
        }
      />
      <TextField
        id="outlined-basic-roomName"
        label="Room"
        variant="outlined"
        error={roomNameError === "" ? false : true}
        helperText={roomNameError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
        }}
        value={roomName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRoomName(e.target.value)
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGameInfoSetter(playerName, roomName)}
      >
        Join Room
      </Button>
    </div>
  )
}
