const { User } = require('../models')
const bcrypt = require('bcrypt')


async function onLogin(req,res){
    const {userName,password} = req.body
    const user = await User.findOne({
        where: {userName}
    });
    if (!user) {
        return res.status(401).json('Login failed');
    }
    req.session.userName = user.userName

    res.json({status:"Yepp"})   
}

async function onCreateAccount(req,res){
    const {userName,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
    userName: userName,
    email: email,
    password:hashedPassword 
})
    res.status(204).json({ email })    
}

module.exports = {
    onLogin,
    onCreateAccount
}