import { GameInfo } from "../App"

const baseUrlProd = "introspect.no"
const baseUrlDev = "10.0.0.6:8080"

export const consts = () => ({
  websocketUrl: (gameInfo: GameInfo) =>
    isProd()
      ? `wss://${baseUrlProd}/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`
      : `ws://${baseUrlDev}/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`,
  validatePlayerNameUrl: (gameInfo: GameInfo) =>
    isProd()
      ? `https://${baseUrlProd}/validateGameInfo?player=${gameInfo.playerName}&room=${gameInfo.roomName}`
      : `http://${baseUrlDev}/validateGameInfo?player=${gameInfo.playerName}&room=${gameInfo.roomName}`,
})

function isProd(): boolean {
  return process.env.NODE_ENV === "production"
}
