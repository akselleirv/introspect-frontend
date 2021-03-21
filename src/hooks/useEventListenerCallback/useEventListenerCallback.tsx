import { useEffect } from "react"
import { GameInfo } from "../../App"
import { GameEvents, LobbyEvents } from "../../consts/events/events"
import { useEventListener } from "../useEventListener/useEventListener"

// useEventListenerCallback will listen on an event and execute the provided callback on event
export function useEventListenerCallback(
  callback: () => void,
  event: GameEvents | LobbyEvents,
  gameInfo: GameInfo
) {
  const { eventMessage } = useEventListener<any>(event, gameInfo)
  useEffect(() => {
    eventMessage !== undefined && callback()
  }, [eventMessage])
}
