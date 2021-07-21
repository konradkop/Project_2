import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  outerRoot:{
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },

  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextBold: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    letterSpacing: -0.17,
  },
  notification: {
    height: 30,
    width: 30,
    backgroundColor: "#3F92FF",
    color: "white",
    fontSize: 15,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, user} = props;
  const {latestMessageText, otherUser} = conversation;
  const [unreadMessageCount, setunreadMessageCount] = useState(0)

  useEffect(() => {
    let tempCounter = 0
    conversation.messages.forEach(message => {
      if(!message.isSeen && message.senderId !== user.id){
        tempCounter = tempCounter + 1
      }
    })
    setunreadMessageCount(tempCounter)
  },[latestMessageText])


  return (
    <Box className={classes.outerRoot}>
      <Box className={classes.root}>
        <Box>
          <Typography className={classes.username}>
          {otherUser.username}
         </Typography>
           {unreadMessageCount > 0 ?
          <Typography className={classes.previewTextBold}>
            {latestMessageText}
          </Typography>:
          <Typography className={classes.previewText}>
          {latestMessageText}
          </Typography>}
        </Box>
      </Box>
      <Box justifyContent="flex-end">
        {unreadMessageCount > 0
            &&
            <Box className={classes.notification}>
              {unreadMessageCount}
        </Box>}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation
  };
};

export default connect(mapStateToProps)(ChatContent);
//  export default ChatContent;
