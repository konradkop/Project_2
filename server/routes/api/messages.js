const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { User } = require("../../db/models");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {

  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
    
    console.log(req.body)
    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      let specificConvo = await Conversation.findByPk(conversationId)

      //even if we have a conversationId- we still have to check if the two parties are actually a part of that conversation
      if (specificConvo.user1Id === senderId){
          const message = await Message.create({ senderId, text, conversationId, isSeen: false});
          return res.json({ message, sender });
      }
    }


    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isSeen: false
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
