const express = require('express');
const userR = require('./user');
const watchR = require('./watchlist')

const router = express.Router();

router.use("/user", userR)
router.use("/watchlist", watchR)
router.get("/hello", (req, res) => {
    res.send("Hello There!")
})


module.exports = router