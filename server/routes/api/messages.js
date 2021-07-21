const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { User } = require("../../db/models");


router.put("/read", async (req, res, next) => {
  const senderId = req.user.id;

  const messageList = await Message.findAll({
    where:{
      conversationId: req.body.id,
      isSeen: false
    } 
  })

  for(let x = 0; x < messageList.length; x++){ 
    if(messageList[x].dataValues.senderId !== senderId){
      messageList[x].dataValues.isSeen = true
      messageList[x].changed("isSeen", true)
      console.log("changeing to isSeen ", messageList[x])
      await messageList[x].save()
    }
}
  res.sendStatus(200)
})


// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
    
    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {

      let specificConvo = await Conversation.findByPk(conversationId)
      //even if we have a conversationId- we still have to check if the two parties are actually a part of that conversation
      if (specificConvo.dataValues.user1Id === senderId || specificConvo.dataValues.user2Id === senderId){

      //getting the messages that haven't been Seen yet
      const messageList = await Message.findAll({
        where:{
          conversationId: conversationId,
          isSeen: false
        } 
      })
      for(let x = 0; x < messageList.length; x++){ 
        if(messageList[x].dataValues.senderId !== senderId){
          messageList[x].dataValues.isSeen = true
          messageList[x].changed("isSeen", true)
          console.log("changeing to isSeen ", messageList[x])
          await messageList[x].save()
        }
    }

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
