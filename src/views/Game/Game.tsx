import { Player } from "../../types/lobby"
import { GameInfo } from "../../App"
import { QuestionVoting } from "./QuestionVoting/QuestionVoting"
import React, { useEffect, useState } from "react"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { GameEvents } from "../../consts/events/events"
import { SelfVoting } from "./SelfVoting/SelfVoting"
import { useQuestion } from "../../hooks/useQuestions/useQuestions"
import { Typography } from "@material-ui/core"
import { PlayerResult, ResultPoints, SelfVote } from "../../types/gameEvents"
import { Scoreboard } from "../../components/Scoreboard/Scoreboard"
import { QuestionResults } from "../../components/QuestionResults/QuestionResults"

enum ScreenMode {
  QuestionVoting = "question_voting",
  SelfVoting = "self_voting",
  Scoreboard = "scoreboard",
  StatusAfterSelfVote = "question_result",
  FetchingQuestion = "fetching_question",
}

export function Game({
  players,
  gameInfo,
}: {
  players: Player[]
  gameInfo: GameInfo
}) {
  const [screenMode, setScreenMode] = useState<ScreenMode>(
    ScreenMode.QuestionVoting
  )
  const [disableVoting, setDisableVoting] = useState<boolean>(false)
  const { question, nextQuestion } = useQuestion(gameInfo)
  const [playersResults, setPlayersResults] = useState<PlayerResult[]>([])

  useEffect(() => {
    setScreenMode(
      question === undefined
        ? ScreenMode.FetchingQuestion
        : ScreenMode.QuestionVoting
    )
  }, [question])

  useEventListenerCallback(
    () => {
      setDisableVoting(false)
      setScreenMode(ScreenMode.SelfVoting)
    },
    GameEvents.IsSelfVote,
    gameInfo
  )

  useEventListenerCallback<{ questionPoints: PlayerResult[] }>(
    (eventMessage) => {
      setDisableVoting(false)
      setScreenMode(ScreenMode.StatusAfterSelfVote)
      eventMessage != undefined &&
        setPlayersResults(eventMessage.questionPoints)

      const timer = setTimeout(() => {
        setScreenMode(ScreenMode.QuestionVoting)
        nextQuestion()
        clearTimeout(timer)
      }, 5000)
    },
    GameEvents.QuestionIsDone,
    gameInfo
  )

  useEventListenerCallback<{ questionPoints: PlayerResult[] }>(
    (eventMessage) => {
      eventMessage !== undefined &&
        setPlayersResults(eventMessage.questionPoints)
      setScreenMode(ScreenMode.Scoreboard)
    },
    GameEvents.GameIsFinished,
    gameInfo
  )
  return (
    <>
      {screenMode === ScreenMode.FetchingQuestion && (
        <Typography>Fetching question...</Typography>
      )}

      {screenMode === ScreenMode.QuestionVoting && (
        <QuestionVoting
          question={question!}
          players={players}
          gameInfo={gameInfo}
          disableVoting={disableVoting}
          setDisableVoting={(disable: boolean) => setDisableVoting(disable)}
        />
      )}

      {screenMode === ScreenMode.SelfVoting && (
        <SelfVoting
          question={question!}
          gameInfo={gameInfo}
          disableVoting={disableVoting}
          setDisableVoting={(disable: boolean) => setDisableVoting(disable)}
        />
      )}

      {screenMode === ScreenMode.StatusAfterSelfVote && (
        <QuestionResults playerResults={playersResults} />
      )}

      {screenMode === ScreenMode.Scoreboard && (
        <Scoreboard players={playersResults} />
      )}
    </>
  )
}
