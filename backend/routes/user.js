const express = require('express');
const { User, WatchList } = require('../db');
const jwt = require("jsonwebtoken");
const { signupMiddleware, signinMiddleware } = require('../middleware');
const { z } = require('zod');
const router = express.Router();
const JWT_SEC = 'heheTheTimeIsNow4Zure';

const signupBody = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(6)
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

router.post("/signup", signupMiddleware, async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ msg: "Wrong Input" })
    }

    try {
        const user = await User.create(req.body)
        const watch = await WatchList.create({ userId: user._id })
        const username = req.body.username
        const token = await jwt.sign({ username }, JWT_SEC);
        res.status(200).json({
            success: true,
            msg: "Signed up successfully",
            token: 'Bearer ' + token
        })
    }
    catch (e) {
        return res.status(401).json({ msg: 'Some Error Occured' })
    }
})

router.post("/signin", signinMiddleware, async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ msg: 'Invalid Input' })
    }

    try {
        const username = req.body.username
        const token = await jwt.sign({ username }, JWT_SEC);
        res.json({
            success: true,
            msg: "Signed in Successfully",
            token: 'Bearer ' + token
        })
    }
    catch (e) {
        res.json({
            msg: e
        })
    }
})


module.exports = router