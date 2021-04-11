import { GameInfo } from "../App"

export const consts = () => ({
  websocketUrl: (gameInfo: GameInfo) =>
    process.env.NODE_ENV === "production"
      ? `wss://introspect.no/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`
      : `ws://localhost:8080/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`,
})
