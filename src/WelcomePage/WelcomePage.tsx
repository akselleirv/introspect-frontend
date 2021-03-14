import {
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { ChangeEvent, useState } from "react";
import { GameInfo } from "../App";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";



export function WelcomePage({
  setGameInfo,
}: {
  setGameInfo: (gameInfo: GameInfo) => void;
}) {
  const [playerName, setPlayerName] = useState("aksel");
  const [roomName, setRoomName] = useState("test");
  return (
    <>
      <Typography variant="h2" align="center" >Welcome to Introspect</Typography>
      <TextField
        id="outlined-basic"
        label="Player name"
        variant="outlined"
        required
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
        id="outlined-basic"
        label="Room"
        variant="outlined"
        required
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
        onClick={() => setGameInfo({ playerName, roomName })}
      >
        Join Room
      </Button>
    </>
  );
}
