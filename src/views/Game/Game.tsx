import { Player } from "../../types/lobby"
import { GameInfo } from "../../App"
import { QuestionVoting } from "./QuestionVoting/QuestionVoting"
import React, { useEffect, useState } from "react"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { GameEvents } from "../../consts/events/events"
import { SelfVoting } from "./SelfVoting/SelfVoting"
import { useQuestion } from "../../hooks/useQuestions/useQuestions"
import { Typography } from "@material-ui/core"
import {
  PlayerResultExtended,
  PlayerResult,
  ResultPoints,
  SelfVote,
} from "../../types/gameEvents"
import { Scoreboard } from "../../components/Scoreboard/Scoreboard"
import { QuestionResults } from "../../components/QuestionResults/QuestionResults"

enum ScreenMode {
  QuestionVoting = "question_voting",
  SelfVoting = "self_voting",
  Scoreboard = "scoreboard",
  StatusAfterSelfVote = "question_result",
  FetchingQuestion = "fetching_question",
}

const MAX_QUESTIONS_PER_ROUND = 4

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
  const [questionResult, setQuestionResult] = useState<PlayerResultExtended[]>(
    []
  )

  const [playersResultsTotal, setPlayersResultsTotal] = useState<
    PlayerResult[]
  >([])
  const [playersResultLastRound, setPlayersResultLastRound] = useState<
    PlayerResult[]
  >([])

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

  useEventListenerCallback<{
    questionPoints: PlayerResultExtended[]
    currentQuestion: number
  }>(
    (eventMessage) => {
      setDisableVoting(false)
      setScreenMode(ScreenMode.StatusAfterSelfVote)
      if (eventMessage != undefined) {
        setQuestionResult(eventMessage.questionPoints)

        if (eventMessage.currentQuestion % MAX_QUESTIONS_PER_ROUND !== 0) {
          const timer = setTimeout(() => {
            setScreenMode(ScreenMode.QuestionVoting)
            nextQuestion()
            clearTimeout(timer)
          }, 3000)
        }
      }
    },
    GameEvents.QuestionIsDone,
    gameInfo
  )

  useEventListenerCallback<{
    playersResultLastRound: PlayerResult[]
    playersResultsTotal: PlayerResult[]
  }>(
    (eventMessage) => {
      if (eventMessage !== undefined) {
        setPlayersResultsTotal(eventMessage.playersResultsTotal)
        setPlayersResultLastRound(eventMessage.playersResultLastRound)
      }

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
        <QuestionResults playerResults={questionResult} />
      )}

      {screenMode === ScreenMode.Scoreboard && (
        <Scoreboard
          allRoundsResult={playersResultsTotal}
          lastRoundResult={playersResultLastRound}
        />
      )}
    </>
  )
}
