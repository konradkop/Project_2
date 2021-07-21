const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (otherUser) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload: {otherUser}
  };
};


//to change the messages to be read
export const changeActiveUser = (state, payload) => {
  return payload.otherUser.otherUser.username
};



const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return changeActiveUser(state, action.payload)
    }
    default:
      return state;
  }
};


export default reducer;
