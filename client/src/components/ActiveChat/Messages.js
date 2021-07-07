import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  function sortTime(a, b) {
    return moment(a.props.sortingTime).diff(moment(b.props.sortingTime)) 
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} sortingTime={message.createdAt}  />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} sortingTime={message.createdAt}/>
        );
      }).sort(sortTime)}
    </Box>
  );
};

export default Messages;
