import { useEffect } from "react"
import { GameInfo } from "../../App"
import { GameEvents, LobbyEvents } from "../../consts/events/events"
import { useEventListener } from "../useEventListener/useEventListener"

type Callback<T> = (() => void) | ((eventMessage: T) => void)

// useEventListenerCallback will listen on an event and execute the provided callback on event
export function useEventListenerCallback<T = any>(
  event: GameEvents | LobbyEvents,
  callback: Callback<T>,
  gameInfo: GameInfo
) {
  const { eventMessage } = useEventListener<T>(event, gameInfo)
  useEffect(() => {
    if (eventMessage !== undefined) {
      callback(eventMessage)
    }
  }, [eventMessage])
}
