const express = require("express")
const app = express()
const port = 3000
const cors = require ("cors")
const bodyParser = require ("body-parser")

app.use(cors())
app.use(bodyParser.json())