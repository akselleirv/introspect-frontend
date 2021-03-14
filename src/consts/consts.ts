import { GameInfo } from "../App";

export const consts = () => ({
    websocketUrl: (gameInfo: GameInfo) => `ws://localhost:8080/ws?player=${gameInfo.playerName}&room=${gameInfo.roomName}`
})