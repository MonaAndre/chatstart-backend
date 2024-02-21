const { User } = require('../models')
const bcrypt = require('bcrypt')


async function onLogin(req,res){
    // 1. ta lösenordet och email från req.body
    // 2. lösenordet bcryptas och jämförs med det i databasen
    // 3. Skapa koppling i session storage
    //   mappa cookie -> useraccount.id

    const {email,password} = req.body

    const user = await User.findOne({
        where: {email}
    });
    if (!user) {
        return res.status(401).json('Login failed');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json('Login failed');
    }    

    req.session.userId = user.id

    res.json({status:"Yepp"})   
}

async function onCreateAccount(req,res){
    console.log(req.body)
    // sommar123
    const {userName,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
    userName: userName,
    email: email,
    password:hashedPassword 
})

    // Cookien och vem är inloggad ???  ->  req
    res.status(204).json({ email })    
}

module.exports = {
    onLogin,
    onCreateAccount
}