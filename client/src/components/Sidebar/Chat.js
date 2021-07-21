import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { fetchConversations } from "../../store/utils/thunkCreators";
import {readConversations} from "../../store/conversations";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};


class Chat extends Component {

  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation);
    await this.props.readConversations(conversation)
    //readConversations sets the conversations to READ
  };


  componentDidMount() {
    const runRead = async () => {
      if (this.props.conversation.otherUser.username === this.props.activeConversation){
        await this.props.readConversations(this.props.conversation)
      }
    }

    //adding an event listener to whenever the user is focused on the webpage
    window.addEventListener("focus", runRead)
  }

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
    readConversations: (oUser) => {
      dispatch(readConversations(oUser));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation,
    conversations: state.conversations
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
