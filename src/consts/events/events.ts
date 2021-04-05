export enum GameEvents {
  PlayerVotedOnQuestion = "register_question_vote",
  GetQuestionsRequest = "get_questions_request",
  GetQuestionsResponse = "get_questions_response",
  QuestionIsDone = "question_is_done",
  GameIsFinished = "game_is_finished",
  IsSelfVote = "is_self_vote",
  RegisterSelfVote = 'register_self_vote',
}

export type RoomEvent = "lobby_room_update"

export enum LobbyEvents {
  RoomUpdate = "lobby_room_update",
  Chat = "lobby_chat",
  PlayerReady = "lobby_player_ready",
}

export interface ChatMessage {
  player: string
  message: string
}
export interface PlayerInfo {
  player: string
}
