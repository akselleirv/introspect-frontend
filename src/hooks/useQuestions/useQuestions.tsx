import { useEffect, useState } from "react"
import { GameInfo } from "../../App"
import { GameEvents, PlayerInfo } from "../../consts/events/events"
import { Question, RawQuestion, RawQuestions } from "../../types/gameEvents"
import { Language } from "../../views/CompositionOfGameAndLobby/CompositionOfGameAndLobby"
import { MAX_QUESTIONS_PER_ROUND } from "../../views/Game/Game"
import { useEventListenerCallback } from "../useEventListenerCallback/useEventListenerCallback"
import { useEventSender } from "../useEventSender/useEventSender"

export function useQuestion(gameInfo: GameInfo, language: Language) {
  const [error, setError] = useState<string>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const { sendEvent } = useEventSender(gameInfo)
  useEventListenerCallback<RawQuestions>(
    GameEvents.GetQuestionsResponse,
    handleQuestionReponse,
    gameInfo
  )

  function handleQuestionReponse(eventMessage: RawQuestions) {
    if (eventMessage.error) {
      setError(eventMessage.error)
      return
    }
    console.log(language)

    setQuestions(eventMessage.questions.map((q) => resolveCorrectLanguage(q, language)))
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

function keyNameFromLanguage(lang: Language) {
  return lang === Language.no ? "no" : "en"
}

function resolveCorrectLanguage(
  unparsedQuestion: RawQuestion,
  chosenLang: Language
): Question {
  return {
    question: unparsedQuestion.question[keyNameFromLanguage(chosenLang)],
    questionID: unparsedQuestion.questionID,
  }
}
