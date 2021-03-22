import { Grid, Avatar, Typography, Paper } from "@material-ui/core"
import React from "react"

export function PlayerPaper({ name }: { name: string }) {
  return (
    <Grid item xs={6} style={{ flexBasis: 0 }}>
      <Paper>
        <Avatar>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography noWrap variant="body1">
          {name.toUpperCase()}
        </Typography>
      </Paper>
    </Grid>
  )
}
