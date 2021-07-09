import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar,Typography } from "@material-ui/core";
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
  
  let maxID = 0
  const lastSeenMessageID = messages.filter((message) => {
    if(message.senderId === userId && message.id > maxID && message.isSeen === true){
      maxID = message.id
    }
  })

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <>
          <SenderBubble key={message.id} text={message.text} time={time} />
          {message.id === maxID &&
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
