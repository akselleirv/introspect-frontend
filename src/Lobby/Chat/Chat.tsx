import { Button, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { Message } from "../Lobby";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: '40ch',
      height: "40ch",
      backgroundColor: theme.palette.background.paper,
      maxHeight: "45ch",
      overflow: "auto",
    },
    inline: {
      display: "inline",
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

export function Chat({
  messages,
  handleSend,
}: {
  messages: Message[];
  handleSend: (message: string) => void;
}) {
  const [messageToSend, setMessageToSend] = useState("");

  return (
    <>
      <DisplayMessages messages={messages} />
      <Box flex alignItems="center">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSend(messageToSend);
            setMessageToSend("");
          }}
        >
          <TextField
            value={messageToSend}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessageToSend(e.target.value)
            }
            placeholder="chat with the other players"
          />
          <Button style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Box>
    </>
  );
}

function DisplayMessages({ messages }: { messages: Message[] }) {
  const scrollRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (scrollRef.current !== null) {
      //@ts-ignore
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <List className={classes.root}>
        {messages.map((m) => (
          <>
            <ListItem divider alignItems="flex-start">
              <ListItemAvatar>
                <Avatar className={classes.orange}>
                  {m.player.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText key={m.message+m.player} primary={m.message} secondary={m.player} />
              <li ref={scrollRef} />
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
}
