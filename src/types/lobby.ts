export type Player = { name: string; isReady: boolean; points: number }

export interface LobbyRoomUpdate {
  players: Player[]
  isAllReady: boolean
  actionTrigger?: ActionTrigger
}

export interface ActionTrigger {
  player: string
  action: LobbyUpdateActions
}

export enum LobbyUpdateActions {
  Joined = "JOINED",
  Left = "LEFT",
}