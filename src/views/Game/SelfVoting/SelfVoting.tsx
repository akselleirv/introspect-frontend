import React from "react"
import { GameInfo } from "../../../App"
import { Player } from "../../../types/lobby"
import { DisplaySelfVoteResult } from "./DisplaySelfVoteResult/DisplaySelfVoteResult"
import { DoSelfVoting } from "./DoSelfVoting/DoSelfVoting"

export function SelfVoting({
  players,
  gameInfo,
}: {
  players: Player[]
  gameInfo: GameInfo
}) {
  return (
    <>
      {/*<DoSelfVoting gameInfo={gameInfo} /> */}
      <DisplaySelfVoteResult players={players}/>
    </>
  )
}
