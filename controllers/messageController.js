const {Messages} = require('../models')

async function onCreateMessage(req, res) {
    
    const {text,userName} = req.body;
    if(req.session.userName){
      userName =  req.session.userName;
    }
    //const userName =  req.session.userName;

    await Messages.create({
        userName: userName,
        text: text
    })
     res.status(200).json({ text })    
}
 
module.exports={
    onCreateMessage
}