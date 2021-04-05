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
    selfVote: SelfVote
    votesReceived: number
    points: ResultPoints
  }

export interface Vote {
    playerWhoReceivedTheVote: string
    questionID: string
}

export interface PlayerVotedOnQuestion {
    player: string
    votes: Vote[] // 2 votes - should be fixed
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
