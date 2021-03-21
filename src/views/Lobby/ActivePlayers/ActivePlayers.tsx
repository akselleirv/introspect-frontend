import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { PlayerPaper } from "../../../components/PlayerPaper/PlayerPaper";
import { Player } from "../../../types/lobby";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "auto",
      height: "25ch",
      width: "90%",
    },
  })
);
export function ActivePlayers({ players }: { players: Player[] }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="row">
        {players.map((player) => (
          <PlayerPaper
            key={player.name}
            name={player.name}
            extraStyle={
              player.isReady ? { backgroundColor: "greenyellow" } : undefined
            }
          />
        ))}
      </Grid>
    </div>
  );
}
