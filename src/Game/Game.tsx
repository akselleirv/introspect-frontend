import { Grid, GridSpacing, Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { PlayerPaper } from "../components/PlayerPaper/PlayerPaper";
import { Player } from "../types/lobby";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    players: {
      position: "fixed",
      top: theme.spacing(50),
    },
    header: {
      position: "fixed",
      top: '10%',
    },
  })
);

export function Game({ players }: { players: Player[] }) {
  const [spacing] = useState<GridSpacing>(2);
  const classes = useStyles();

  const mockPl: Player[] = [
    { name: "AAAAAAAAA", isReady: true },
    { name: "BBB", isReady: true },
    { name: "CCC", isReady: true },
    { name: "DDD", isReady: true },
    { name: "EEE", isReady: true },
  ];
  return (
    <>
      <Typography variant="h4" align="center" className={classes.header}>
        The question will be displayed here
      </Typography>

      <Grid
        container
        alignContent="space-between"
        justify="center"
        className={classes.players}
        spacing={spacing}
      >
        {mockPl.map((p) => (
          <PlayerPaper name={p.name} />
        ))}
      </Grid>
    </>
  );
}
