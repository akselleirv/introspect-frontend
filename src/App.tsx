import React, { useState } from "react";
import { WelcomePage } from "./views/WelcomePage/WelcomePage";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { CompositionOfGameAndLobby } from "./views/CompositionOfGameAndLobby/CompositionOfGameAndLobby";
import { SelfVoting } from "./views/Game/SelfVoting/SelfVoting";
import { Player } from "./types/lobby";

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

const mockPlayers: Player[] = [
  {name: 'Player AA', isReady: true},
  {name: 'Player BB', isReady: true},
  {name: 'Player CC', isReady: true},
  {name: 'Player DD', isReady: true},
  {name: 'Player EE', isReady: true},
]

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
        // <WelcomePage
        //   setGameInfo={(gameInfo: GameInfo) => setGameInfo(gameInfo)}
        // />
        <SelfVoting players={mockPlayers} gameInfo={{roomName: 'test', playerName: 'test'}} />
      )}
    </Grid>
  );
}

export default App;
