import { Button, Grid, GridSpacing } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    name: {
      paddingLeft: theme.spacing(1),
    },
    button: {
      width: theme.spacing(24)
    }
  })
);
export function PlayerPaper({
  name,
  extraStyle,
}: {
  name: string;
  extraStyle?: React.CSSProperties | undefined;
}) {
  const classes = useStyles();

  return (
    <Grid item xs={6} style={{flexBasis: 0}}>
      <Button variant="contained" className={classes.button}>
        <Avatar className={classes.avatar}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography className={classes.name} noWrap variant="body1">
          {name.toUpperCase()}
        </Typography>
      </Button>
    </Grid>
  );
}
