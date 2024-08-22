const express = require('express');
const userR = require('./user');
const watchR = require('./watchlist')

const router = express.Router();

router.use("/user",userR)
router.use("/watchlist",watchR)


module.exports = router