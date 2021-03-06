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
export interface RawQuestions {
  error?: string
  questions: RawQuestion[]
}

export interface RawQuestion {
  questionID: string
  question: { no: string; en: string }
}

export interface Question {
  questionID: string
  question: string
}

export interface RegisterSelfVote {
  player: string
  choice: SelfVote
  question: Question
}

export interface GenericEvent {
  player: string
}
