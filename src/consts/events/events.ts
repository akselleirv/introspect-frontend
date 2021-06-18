export enum GameEvents {
  PlayerVotedOnQuestion = "register_question_vote",
  GetQuestionsRequest = "get_questions_request",
  GetQuestionsResponse = "get_questions_response",
  QuestionIsDone = "question_is_done",
  GameIsFinished = "game_is_finished",
  IsSelfVote = "is_self_vote",
  RegisterSelfVote = "register_self_vote",
  NextRound = "next_round",
  AllPlayerReadyForNextRound = "all_players_ready_for_next_round",
}

export type RoomEvent = "lobby_room_update"

export enum LobbyEvents {
  RoomUpdate = "lobby_room_update",
  Chat = "lobby_chat",
  PlayerReady = "lobby_player_ready",
  AddQuestion = "add_question",
  PlayerAddedCustomQuestion = "player_added_custom_question",
}

export interface ChatMessage extends PlayerInfo {
  message: string
}
export interface PlayerInfo {
  player: string
}

export interface AddQuestionEvent extends PlayerInfo {
  question: string
}
