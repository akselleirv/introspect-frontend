import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import { useState, ChangeEvent } from "react"
import styles from "./AddQuestion.module.scss"

export function AddQuestion({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [question, setQuestion] = useState<string>()
  function handleQuestion() {
    // handle question to backend
    onClose()
    setQuestion("")
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
          multiline
          rowsMax={4}
          value={question}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
        />
        <Button variant="contained" color="primary" onClick={handleQuestion}>
          Add
        </Button>
      </div>
    </Dialog>
  )
}
