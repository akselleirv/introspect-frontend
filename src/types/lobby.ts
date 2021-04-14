export type Player = { name: string; isReady: boolean; points: number };

export interface LobbyRoomUpdate {
  players: Player[];
  isAllReady: boolean;
}
