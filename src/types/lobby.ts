export type Player = { name: string; isReady: boolean; points: number }

export interface LobbyRoomUpdate {
  players: Player[]
  isAllReady: boolean
  actionTrigger?: ActionTrigger
}

export interface ActionTrigger {
  player: string
  action: Actions
}
export enum Actions {
  CustomQuestionAdded = "player_added_custom_question",
  Joined = "JOINED",
  Left = "LEFT",
}
