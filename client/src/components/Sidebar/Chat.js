import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import axios from "axios";
import { fetchConversations } from "../../store/utils/thunkCreators";

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
    const { data } = await axios.post("/api/readMessages", {newConvo: this.props.conversation, oldConvo: null});
    console.log(data)
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.props.fetchConversations()
  };

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
