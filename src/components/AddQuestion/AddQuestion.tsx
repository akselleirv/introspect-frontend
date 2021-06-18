import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import { useState, ChangeEvent, KeyboardEvent } from "react"
import { GameInfo } from "../../App"
import { AddQuestionEvent, LobbyEvents } from "../../consts/events/events"
import { useEventSender } from "../../hooks/useEventSender/useEventSender"
import styles from "./AddQuestion.module.scss"

export function AddQuestion({
  open,
  onClose,
  gameInfo,
}: {
  open: boolean
  onClose: () => void
  gameInfo: GameInfo
}) {
  const [question, setQuestion] = useState<string>()
  const { sendEvent } = useEventSender(gameInfo)

  function sendQuestion() {
    if (question) {
      sendEvent<AddQuestionEvent>(LobbyEvents.AddQuestion, {
        player: gameInfo.playerName,
        question: question.trim(),
      })
      onClose()
      setQuestion("")
    }
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={styles.container}>
        <DialogTitle id="simple-dialog-title">
          Add Your Own Question
        </DialogTitle>
        <TextField
          id="standard-multiline-flexible"
          placeholder="insert home-made question..."
          autoFocus
          value={question}
          onSubmit={sendQuestion}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value.trimStart())
          }
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              sendQuestion()
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={sendQuestion}>
          Add
        </Button>
      </div>
    </Dialog>
  )
}
