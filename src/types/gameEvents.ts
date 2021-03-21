import { SelfVote } from "../views/Game/SelfVoting/SelfVoting";

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