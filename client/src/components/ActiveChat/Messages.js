import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  avatar: {
    height: 10,
    width: 10,
    marginLeft: "auto",
  }
  }));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const [count, setCount] = useState(0);  
  let lastSeenMessageID = 0


  useEffect(()=> {
    const runRead = async () => {
      messages.forEach((message) => {
        if(message.senderId === userId && message.id > lastSeenMessageID && message.isSeen){
          lastSeenMessageID = message.id
        }
      })
      setCount(lastSeenMessageID) 
    }
    window.addEventListener("focus", runRead)
  })

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <>
          <SenderBubble key={message.id} text={message.text} time={time} />
          {message.id === count &&
            <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
          }
         </>   
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}/>
        );
      })}
    </Box>
  );
};

export default Messages;
