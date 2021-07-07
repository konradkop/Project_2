const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { User } = require("../../db/models");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  
  async function verifyUser () {
    const user = await User.findOne({
      where: {
        username: req.user.username,
      },
    });
    if(!user){
      return res.status(401).json({ error: "Wrong username and/or password" });
    }
    if (req.user.password() != user.password()){
      console.log({ error: "Not properly authenticated- message denied" })
      return res.status(401).json({ error: "Not properly authenticated- message denied"});
    }
  }

  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    //this checks if the user if properly verified. If they aren't, it throws an error, and prevents the message from being sent
    const verifying = await verifyUser()

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId && conversationId === await Conversation.getID(senderId, recipientId)) {
      //even if we have a conversationId- we still have to check if the two parties are actually a part of that conversation
          const message = await Message.create({ senderId, text, conversationId});
          return res.json({ message, sender });
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
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
