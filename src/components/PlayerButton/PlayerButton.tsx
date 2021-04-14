import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styles from './PlayerButton.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    button: {
      backgroundColor: "white",
    },
  })
);
export function PlayerButton({
  name,
  extraStyle,
  actionHandler,
  disabled,
}: {
  name: string;
  extraStyle?: React.CSSProperties | undefined;
  actionHandler?: (info: string) => void;
  disabled?: boolean
}) {
  const classes = useStyles();

  return (
      <Button
        variant="contained"
        className={`${styles.button} ${classes.button}`}
        style={extraStyle}
        onClick={actionHandler ? () => actionHandler(name) : undefined}
        disabled={disabled}
        
      >
        <Avatar className={classes.avatar}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography noWrap variant="body1">
          {name.toUpperCase()}
        </Typography>
      </Button>
  );
}
