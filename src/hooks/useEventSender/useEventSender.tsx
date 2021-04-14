import useWebSocket from "react-use-websocket"
import { GameInfo } from "../../App"
import { consts } from "../../consts/consts"
import { GameEvents, LobbyEvents } from "../../consts/events/events"

export function useEventSender(gameInfo: GameInfo) {
  const { sendJsonMessage } = useWebSocket(consts().websocketUrl(gameInfo), {
    share: true,
  })

  function sendEvent<T>(eventName: GameEvents | LobbyEvents, data: T) {
    sendJsonMessage({ event: eventName, ...data })
  }

  return { sendEvent }
}
