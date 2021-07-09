const router = require("express").Router();
const { Message} = require("../../db/models");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
    try {

        if(!req.body.oldConvo){
            req.body.oldConvo = {id: null}
        }


        if (!req.user) {
          return res.sendStatus(401);
        }
        const specificConvo = await Message.findAll({
            where:{ [Op.or]: [
                { conversationId: req.body.newConvo.id },
                { conversationId: req.body.oldConvo.id },
              ] 
            } 
    })
        for(let x = 0; x < specificConvo.length; x++){
            
            if(specificConvo[x].dataValues.isSeen === false && specificConvo[x].dataValues.senderId != req.user.dataValues.id){
                specificConvo[x].dataValues.isSeen = true
                specificConvo[x].changed("isSeen", true)
                console.log("Changed? ", specificConvo[x].changed())
                await specificConvo[x].save()
                await specificConvo[x].reload()
            }
        }

        res.send("OK")
        }
        catch (error) {
            next(error);
        }
})

module.exports = router;
