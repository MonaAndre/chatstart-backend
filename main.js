const express = require("express")
const app = express()
const port = 3000
const cors = require ("cors")
const {sequelize, User} = require ('./models')
const migrationhelper = require('./migrationhelper')
const session = require('express-session');
const userController = require('./controllers/userController.js')
const {check, validationResult} = require('express-validator')
const {requireAuth} = require('./middlewares/requireAuth.js')
const {validateCreateUser} = require('./validators/userValidators.js')


app.use(express.json())


app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true
}))

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } HTTPS
}));

//app.post('/createAccount',validateCreateUser, userController.onCreateAccount)
app.post('/api/signIn',userController.onLogin);

app.post('/createAccount', validateCreateUser, userController.onCreateAccount,
  (req, res) => {
    res.send(`Hello, ${req.body.name}!`);
});

app.listen(port, async () => {
    await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})


