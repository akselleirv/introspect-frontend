import { useEffect, useState } from "react"
import { GameInfo } from "../../App"
import { GameEvents, PlayerInfo } from "../../consts/events/events"
import { Question } from "../../types/gameEvents"
import { useEventListener } from "../useEventListener/useEventListener"
import { useEventSender } from "../useEventSender/useEventSender"

export function useQuestion(gameInfo: GameInfo) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const { sendEvent } = useEventSender(gameInfo)
  const { eventMessage: questionsEvent } = useEventListener<{
    questions: Question[]
  }>(GameEvents.GetQuestionsResponse, gameInfo)

  useEffect(() => {
    questionsEvent !== undefined && setQuestions(questionsEvent.questions)
  }, [questionsEvent])

  useEffect(() => {
    sendEvent<PlayerInfo>(GameEvents.GetQuestionsRequest, {
      player: gameInfo.playerName,
    })
  }, [])

  function nextQuestion(): void {
    setCurrentQuestion((prevQuestion) => ++prevQuestion)
  }

  return {
    question:
      typeof questions[currentQuestion] === undefined
        ? undefined
        : questions[currentQuestion],
    nextQuestion,
  }
}