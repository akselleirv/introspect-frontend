import { Player } from "../../types/lobby"
import { GameInfo } from "../../App"
import { QuestionVoting } from "./QuestionVoting/QuestionVoting"
import React, { useEffect, useState } from "react"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { GameEvents } from "../../consts/events/events"
import { SelfVoting } from "./SelfVoting/SelfVoting"
import { useQuestion } from "../../hooks/useQuestions/useQuestions"
import { Typography } from "@material-ui/core"

enum ScreenMode {
  QuestionVoting = "question_voting",
  SelfVoting = "self_voting",
  Scoreboard = "scoreboard",
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

  useEventListenerCallback(
    () => {
      setDisableVoting(false)
      setScreenMode(ScreenMode.QuestionVoting)
      nextQuestion()
    },
    GameEvents.RoundIsDone,
    gameInfo
  )

  // useEventListenerCallback(
  //   () => {
  //     setScreenMode(ScreenMode.Scoreboard)
  //   },
  //   GameEvents.RoundIsDone,
  //   gameInfo
  // )
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
    </>
  )
}
