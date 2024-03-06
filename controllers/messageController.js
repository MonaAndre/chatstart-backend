const {Messages} = require('../models')

async function onCreateMessage(req, res) {
    
    const {text} = req.body;
    let userName
    if(req.session.userName){
        userName = req.session.userName;
    } else{
        console.log("logga in först");
    }
  

    await Messages.create({
        userName: userName,
        text: text
    })
     res.status(204).json({ text })    
}
 
module.exports={
    onCreateMessage
}