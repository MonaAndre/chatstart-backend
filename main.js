const express = require("express")
const app = express()
const port = 3000
const cors = require ("cors")
const bodyParser = require ("body-parser")

app.use(cors())
app.use(bodyParser.json())

function getNextId(){
    let m = Math.max(...users.map(user => user.id))
    return m + 1
}


let users = [{
   userName: "user1",
   password: "1998",
   id: 1
}]

let messages= [{
    userName: "user1",
    message: "hej hopp trallalla",
    time: "18.30.45"
 }
]
app.get('/api/chat',(req,res)=>{
    let result = users.map(user=>({
        userName: user.userName,
        password: user.password,
    }))
     res.json(result)
});

app.post('/api/chat',(req,res)=>{
  const user = {
      userName : req.body.userName,
      password: req.body.password,
      id:getNextId()
  }
  users.push(user)
  res.status(201).send('Created')
});

app.listen(port, () => {
    console.log(`Example app listening2 on port ${port}`)
})
