import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "auto",
      height: "25ch",
      width: "90%"
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    name: {
      paddingLeft: theme.spacing(1),
    },
  })
);
export function ActivePlayers({ players }: { players: string[] }) {
  const classes = useStyles();

  function PlayerItem({ player }: { player: string }) {
    return (
      <>
        <Grid item xs={6}>
          <Paper elevation={4} className={classes.paper}>
            <Avatar className={classes.avatar}>
              {player.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.name}  noWrap variant="body1">
              {player.toUpperCase()}
            </Typography>
          </Paper>
        </Grid>
      </>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="row">
        {players.map((player) => (
          <PlayerItem key={player} player={player} />
        ))}
      </Grid>
    </div>
  );
}
