const express = require("express")
const app = express()
const port = 3000
const cors = require ("cors")
const {sequelize, User, Messages} = require ('./models')
const migrationhelper = require('./migrationhelper')
const session = require('express-session');
const userController = require('./controllers/userController.js')
const {check, validationResult} = require('express-validator')
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
    // cookie: { secure: true } HTTPS
}));

//app.post('/createAccount',validateCreateUser, userController.onCreateAccount)
app.post('/api/signIn', userController.onLogin);

app.post('/createAccount', validateCreateUser, userController.onCreateAccount,
  (req, res) => {
    res.send(`Hello, ${req.body.name}!`);
});

app.get('/allMessages',async (req, res)=>{
    let messages = await Messages.findAll()
    console.log(req.session.userName);
    let result = messages.map(m=> ({
        text: m.text,
        userName: m.userName,
        isCurrentUser: req.session.userName == m.userName
        
    }))
    res.json(result)
});

app.post('/newMessage', messageController.onCreateMessage,);

app.listen(port, async () => {
    await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})

