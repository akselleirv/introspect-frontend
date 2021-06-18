import { useEffect, useState } from "react"
import { GameInfo } from "../../App"
import { usePlayers } from "../../hooks/usePlayers/usePlayers"
import styles from "./LobbyAction.module.scss"
import { useTransition, animated } from "react-spring"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"
import { ActionTrigger, Actions } from "../../types/lobby"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { LobbyEvents } from "../../consts/events/events"

export function LobbyAction({ gameInfo }: { gameInfo: GameInfo }) {
  const { actionTrigger } = usePlayers(gameInfo)
  useEventListenerCallback<ActionTrigger>(
    LobbyEvents.PlayerAddedCustomQuestion,
    handleActionTrigger,
    gameInfo
  )

  const [actionTriggers, setActionTriggers] = useState<ActionTrigger[]>([])
  const transitions = useTransition(
    actionTriggers,
    (action) => action.player + action.action,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  )

  useEffect(() => {
    if (actionTrigger !== undefined && actionTrigger.player !== "") {
      handleActionTrigger(actionTrigger)
    }
  }, [actionTrigger])

  function handleActionTrigger(actionTrigger: ActionTrigger) {
    const newTrigger: ActionTrigger = {
      player: actionTrigger.player,
      action: actionTrigger.action,
    }
    setActionTriggers((prev) => [newTrigger, ...prev])

    const timer = setTimeout(() => {
      setActionTriggers((prev) =>
        prev.filter((action) => action.player !== newTrigger.player)
      )
      clearTimeout(timer)
    }, 3000)
  }

  const handleClose = (player: string) => {
    setActionTriggers((prev) =>
      prev.filter((action) => action.player !== player)
    )
  }

  return (
    <>
      <div className={styles.container}>
        {transitions.map(
          ({ item, key, props }) =>
            item !== undefined && (
              <animated.div
                key={key}
                style={props}
                onClick={() => handleClose(item.player)}
                className={`${styles.alertItem} ${
                  item.action === Actions.Left ? styles.left : styles.joined
                }`}
              >
                <ErrorOutlineIcon />
                <span>{resolveActionMessage(item)}</span>
              </animated.div>
            )
        )}
      </div>
    </>
  )
}

function resolveActionMessage(trigger: ActionTrigger): string {
  const actionHandlers = new Map([
    [Actions.Joined, `${trigger.player} joined 👋👋`],
    [Actions.Left, `${trigger.player} left 👋👋`],
    [
      Actions.CustomQuestionAdded,
      `${trigger.player} added a custom question 🤔🤔`,
    ],
  ])
  
  if (!actionHandlers.has(trigger.action)) {
    throw new Error(`no action handler found for action: ${trigger.action}`)
  }
  return actionHandlers.get(trigger.action)!
}
