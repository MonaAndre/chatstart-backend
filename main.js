const express = require("express")
const app = express()
const port = 3000
const cors = require ("cors")
const {sequelize, User, Messages} = require ('./models')
const migrationhelper = require('./migrationhelper')
const session = require('express-session');
const userController = require('./controllers/userController.js')
const {requireAuth} = require('./middlewares/requireAuth.js')
const {validateCreateUser} = require('./validators/userValidators.js')
const messageController = require('./controllers/messageController.js')

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5501",
    credentials:true
}))

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.post('/api/signIn', userController.onLogin);

app.post('/createAccount', validateCreateUser, userController.onCreateAccount,
  (req, res) => {
    res.send(`Hello, ${req.body.name}!`);
});

app.get('/allMessages',async (req, res)=>{
    if (req.session.userName == undefined || req.session.userName == null){
        res.status(401).json({error: 'You are not logged in'});
    }else{
    let messages = await Messages.findAll()
    console.log(req.session.userName);
    let result = messages.map(m=> ({
        text: m.text,
        userName: m.userName,
        isCurrentUser: req.session.userName == m.userName       
    }))
    res.json(result)
 }
});

app.get('/session', (req, res) => {
console.log(req.session.userName)
res.send(req.session.userName)
});

app.post('/newMessage', messageController.onCreateMessage,);

app.listen(port, async () => {
    await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})