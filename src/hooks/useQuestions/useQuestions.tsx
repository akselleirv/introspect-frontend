import { useEffect, useState } from "react"
import { GameInfo } from "../../App"
import { GameEvents, PlayerInfo } from "../../consts/events/events"
import { Question, Questions } from "../../types/gameEvents"
import { MAX_QUESTIONS_PER_ROUND } from "../../views/Game/Game"
import { useEventListenerCallback } from "../useEventListenerCallback/useEventListenerCallback"
import { useEventSender } from "../useEventSender/useEventSender"

export function useQuestion(gameInfo: GameInfo) {
  const [error, setError] = useState<string>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const { sendEvent } = useEventSender(gameInfo)
  useEventListenerCallback<Questions>(
    GameEvents.GetQuestionsResponse,
    handleQuestionReponse,
    gameInfo
  )

  function handleQuestionReponse(eventMessage: Questions) {
    if (eventMessage.error) {
      setError(eventMessage.error)
      return
    }
    setQuestions(eventMessage.questions)
  }

  // eslint-disable-next-line
  useEffect(getQuestions, [])

  function getQuestions() {
    sendEvent<PlayerInfo>(GameEvents.GetQuestionsRequest, {
      player: gameInfo.playerName,
    })
  }

  function nextQuestion(): void {
    if (currentQuestion + 1 === MAX_QUESTIONS_PER_ROUND) {
      getQuestions()
      setCurrentQuestion(0)
    } else {
      setCurrentQuestion((prevQuestion) => ++prevQuestion)
    }
  }

  return {
    question:
      typeof questions[currentQuestion] === undefined
        ? undefined
        : questions[currentQuestion],
    nextQuestion,
    error,
  }
}
