import { Grid, GridSpacing } from "@material-ui/core"
import React, { useState } from "react"
import { Player } from "../../types/lobby"
import { PlayerButton } from "../PlayerButton/PlayerButton"

export function PlayerGrid({
  players,
  gridStyle,
  actionHandler,
  disableButtons,
}: {
  players: Player[]
  gridStyle?: string
  actionHandler?: (nameOfClicked: string) => void
  disableButtons?: boolean
}) {
  const [spacing] = useState<GridSpacing>(2)
  return (
    <Grid
      container
      alignContent="space-between"
      justify="center"
      className={gridStyle}
      spacing={spacing}
    >
      {players.map((p) => (
        <PlayerButton
          name={p.name}
          actionHandler={actionHandler}
          disabled={disableButtons}
        />
      ))}
    </Grid>
  )
}
