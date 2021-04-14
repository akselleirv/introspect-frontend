import { GameInfo } from "../App"

export const consts = () => ({
  websocketUrl: (gameInfo: GameInfo) =>
    process.env.NODE_ENV === "production"
      ? `wss://introspect.no/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`
      : `ws://10.0.0.6:8080/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`,
})
