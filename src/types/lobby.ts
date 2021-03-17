export type Player = { name: string; isReady: boolean };

export interface LobbyRoomUpdate {
  players: Player[];
  isAllReady: boolean;
}
