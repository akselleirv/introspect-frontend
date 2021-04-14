import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { GameInfo } from "../../App"
import { consts } from "../../consts/consts"
import { GameEvents, LobbyEvents } from "../../consts/events/events"

export function useEventListener<T>(
  event: GameEvents | LobbyEvents,
  gameInfo: GameInfo
) {
  const [eventMessage, setEventMessage] = useState<T>()
  const { lastJsonMessage } = useWebSocket(consts().websocketUrl(gameInfo), {
    share: true,
  })

  useEffect(() => {
    if (lastJsonMessage != null) {
      if (lastJsonMessage.event === event) {
        delete lastJsonMessage["event"]
        setEventMessage(lastJsonMessage)
      }
    }
  }, [event, lastJsonMessage])

  return { eventMessage }
}
