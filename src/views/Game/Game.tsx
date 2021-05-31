import { Player } from "../../types/lobby"
import { GameInfo } from "../../App"
import { QuestionVoting } from "./QuestionVoting/QuestionVoting"
import React, { useEffect, useState } from "react"
import { useEventListenerCallback } from "../../hooks/useEventListenerCallback/useEventListenerCallback"
import { GameEvents } from "../../consts/events/events"
import { SelfVoting } from "./SelfVoting/SelfVoting"
import { useQuestion } from "../../hooks/useQuestions/useQuestions"
import { Typography } from "@material-ui/core"
import { PlayerResultExtended, PlayerResult } from "../../types/gameEvents"
import { ScoreboardProps } from "../../components/Scoreboard/Scoreboard"
import { QuestionResults } from "../../components/QuestionResults/QuestionResults"
import styles from "./Game.module.scss"
import { ScoreboardView } from "../../components/ScoreboardView/ScoreboardView"

enum ScreenMode {
  QuestionVoting = "question_voting",
  SelfVoting = "self_voting",
  Scoreboard = "scoreboard",
  StatusAfterSelfVote = "question_result",
  FetchingQuestion = "fetching_question",
}

type QuestionIsDoneProps = {
  questionPoints: PlayerResultExtended[]
  currentQuestion: number
}

export const MAX_QUESTIONS_PER_ROUND = 4

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
  const { question, nextQuestion, error } = useQuestion(gameInfo)
  const [questionResult, setQuestionResult] = useState<PlayerResultExtended[]>(
    []
  )
  const [playersResults, setPlayersResults] = useState<PlayerResult[]>([])
  const [playersResultExceptLastRound, setPlayersResultExceptLastRound] =
    useState<PlayerResult[]>([])

  useEffect(() => {
    setScreenMode(
      question === undefined
        ? ScreenMode.FetchingQuestion
        : ScreenMode.QuestionVoting
    )
  }, [question])

  useEventListenerCallback<QuestionIsDoneProps>(
    GameEvents.QuestionIsDone,
    handleQuestionIsDoneEvent,
    gameInfo
  )

  useEventListenerCallback(GameEvents.IsSelfVote, handleSelfVoteEvent, gameInfo)

  useEventListenerCallback<ScoreboardProps>(
    GameEvents.GameIsFinished,
    handleScoreboardEvent,
    gameInfo
  )

  useEventListenerCallback(
    GameEvents.AllPlayerReadyForNextRound,
    handleNextRoundEvent,
    gameInfo
  )

  function handleQuestionIsDoneEvent(eventMessage: QuestionIsDoneProps) {
    setDisableVoting(false)
    setScreenMode(ScreenMode.StatusAfterSelfVote)
    setQuestionResult(eventMessage.questionPoints)

    // if not the last round, then display results for given ms
    // finally change screen to question voting
    if (eventMessage.currentQuestion % MAX_QUESTIONS_PER_ROUND !== 0) {
      const timer = setTimeout(() => {
        setScreenMode(ScreenMode.QuestionVoting)
        nextQuestion()
        clearTimeout(timer)
      }, 3000)
    }
  }

  function handleSelfVoteEvent() {
    setDisableVoting(false)
    setScreenMode(ScreenMode.SelfVoting)
  }

  function handleScoreboardEvent(eventMessage: ScoreboardProps) {
    setPlayersResultExceptLastRound(
      eventMessage.playersResultExceptLastRound === null
        ? players
            .map((p) => ({ player: p.name, points: 0 }))
            .concat([{ player: gameInfo.playerName, points: 0 }])
        : eventMessage.playersResultExceptLastRound
    )
    setPlayersResults(eventMessage.playersResults)

    setScreenMode(ScreenMode.Scoreboard)
  }

  function handleNextRoundEvent() {
    nextQuestion()
    setScreenMode(ScreenMode.QuestionVoting)
  }

  if (error) {
    return <h1>No more questions.</h1>
  }

  return (
    <div className={styles.containerDeadCenter}>
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
        <ScoreboardView
          playersResults={playersResults}
          playersResultExceptLastRound={playersResultExceptLastRound}
          gameInfo={gameInfo}
        />
      )}
    </div>
  )
}
