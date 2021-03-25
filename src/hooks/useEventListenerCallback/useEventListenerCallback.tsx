import { useEffect } from "react"
import { GameInfo } from "../../App"
import { GameEvents, LobbyEvents } from "../../consts/events/events"
import { useEventListener } from "../useEventListener/useEventListener"

type Callback<T> = (eventMessage?: T) => void 

// useEventListenerCallback will listen on an event and execute the provided callback on event
export function useEventListenerCallback<T = any>(
  callback: Callback<T>,
  event: GameEvents | LobbyEvents,
  gameInfo: GameInfo
) {
  const { eventMessage } = useEventListener<T>(event, gameInfo)
  useEffect(() => {
    eventMessage !== undefined && callback(eventMessage)
  }, [eventMessage])
}
