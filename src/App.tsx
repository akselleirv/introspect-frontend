import React, { useState } from "react"
import { WelcomePage } from "./views/WelcomePage/WelcomePage"
import { CompositionOfGameAndLobby } from "./views/CompositionOfGameAndLobby/CompositionOfGameAndLobby"
import styles from "./App.module.scss"

export type GameInfo = { playerName: string; roomName: string }
function App() {
  const [gameInfo, setGameInfo] = useState<GameInfo>()
  return (
    <div className={styles.container}>
      {gameInfo ? (
        <div>
          <CompositionOfGameAndLobby gameInfo={gameInfo} />
        </div>
      ) : (
        <WelcomePage
          setGameInfo={(gameInfo: GameInfo) => setGameInfo(gameInfo)}
        />
      )}
    </div>
  )
}

export default App
