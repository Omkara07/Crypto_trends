const express = require('express')
const mainRouter = require('./routes/index')
const cors = require('cors')
const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())
app.use("/api/v1", mainRouter)



app.listen(PORT);