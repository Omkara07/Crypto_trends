const express = require('express');
const { WatchList } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
    try {
        const newuser = await WatchList.updateOne(
            { userId: req.body.userId },
            { $push: { watchList: req.body } }
        )
        if (newuser) {
            console.log(newuser)
            res.json(
                {
                    msg: 'updated Successfully',
                    data: req.body
                }
            )
        }
    }
    catch (e) {
        console.log(e)
        res.status(404).json({
            msg: 'Something went wrong'
        })
    }
})
router.delete("/remove", authMiddleware, async (req, res) => {
    try {
        const newuser = await WatchList.updateOne(
            { userId: req.body.userId },
            { $pull: { watchList: { id: req.body.id } } }
        )
        if (newuser) {
            console.log(newuser)
            res.json(
                {
                    msg: 'updated Successfully',
                    data: req.body
                }
            )
        }
    }
    catch (e) {
        console.log(e)
        res.status(404).json({
            msg: 'Something went wrong'
        })
    }
})

router.get("/getall", authMiddleware, async (req, res) => {
    try {
        const user = await WatchList.findOne({ userId: req.body.userId });
        res.json({
            items: user.watchList
        })
    }
    catch (e) {
        console.log(e)
        res.status(404).json({
            msg: e
        })
    }
})


module.exports = router