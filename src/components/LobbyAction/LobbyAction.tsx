import { useEffect, useState } from "react"
import { GameInfo } from "../../App"
import { usePlayers } from "../../hooks/usePlayers/usePlayers"
import styles from "./LobbyAction.module.scss"
import { useTransition, animated } from "react-spring"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"
import { LobbyUpdateActions } from "../../types/lobby"

type ActionTrigger = { player: string; action: LobbyUpdateActions }

export function LobbyAction({ gameInfo }: { gameInfo: GameInfo }) {
  const { actionTrigger } = usePlayers(gameInfo)

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
      action: actionTrigger.action as LobbyUpdateActions,
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
                  item.action === LobbyUpdateActions.Joined
                    ? styles.joined
                    : styles.left
                }`}
              >
                <ErrorOutlineIcon />
                <span>
                  {item.player} {item.action.toLocaleLowerCase()} 👋👋
                </span>
              </animated.div>
            )
        )}
      </div>
    </>
  )
}