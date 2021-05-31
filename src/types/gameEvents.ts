export enum SelfVote {
  MostVoted = "Most Voted",
  Neutral = "Neutral",
  LeastVoted = " Least Voted",
}
export enum ResultPoints {
  FullPoints = 3,
  NeutralPoints = 1,
  NonePoints = 0,
}

export interface PlayerResult {
  player: string
  points: number
}

export interface PlayerResultExtended extends PlayerResult {
  selfVote: SelfVote
  votesReceived: number
}

export interface Vote {
  playerWhoReceivedTheVote: string
  questionID: string
}

export interface PlayerVotedOnQuestion {
  player: string
  votes: Vote[] // 2 votes - should be fixed
}
export interface Questions {
  error?: string
  questions: Question[]
}

export interface Question {
  questionID: string
  question: QuestionTranslations
}

export interface QuestionTranslations {
  en: string
  no: string
}

export interface RegisterSelfVote {
  player: string
  choice: SelfVote
  question: Question
}

export interface GenericEvent {
  player: string
}
