import React, { useEffect, useState } from "react";
import { WelcomePage } from "./WelcomePage/WelcomePage";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Lobby } from "./Lobby/Lobby";
import { Game } from "./Game/Game";
import { LobbyRoomUpdate } from "./types/lobby";
import { consts } from "./consts/consts";
import useWebSocket from "react-use-websocket";
import { RoomEventsLobby } from "./types/roomEvent";
import { usePlayers } from "./hooks/usePlayers/usePlayers";
import { CompositionOfGameAndLobby } from "./CompositionOfGameAndLobby/CompositionOfGameAndLobby";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        width: "30ch",
      },
    },
  })
);

export type GameInfo = { playerName: string; roomName: string };
function App() {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = useState<GameInfo>();
  return (
    <Grid
      className={classes.root}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "60vh" }}
    >
      {gameInfo ? (
        <>
        <CompositionOfGameAndLobby gameInfo={gameInfo}/>
        </>
      ) : (
        <WelcomePage
          setGameInfo={(gameInfo: GameInfo) => setGameInfo(gameInfo)}
        />
      )}
    </Grid>
  );
}

export default App;
