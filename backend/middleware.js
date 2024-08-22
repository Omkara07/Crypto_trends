const { User } = require("./db");
const jwt = require('jsonwebtoken')
const JWT_SEC = 'heheTheTimeIsNow4Zure';

const signupMiddleware = async (req, res, next) => {
    const username = req.body.username
    const user_exist = await User.findOne({ username: username });
    if (user_exist) {
        return res.status(404).json({ msg: "User already Exist" })
    }
    else {
        next();
    }
}
const signinMiddleware = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        return res.status(404).json({ msg: "User doesn't Exist" })
    }
    else {
        next();
    }
}

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authentication.split(' ')[1]
    // console.log(token)
    const uname_obj = jwt.verify(token, JWT_SEC);
    // console.log(uname_obj)
    const username = uname_obj.username
    // console.log(username)
    try {
        const user = await User.findOne({ username });
        req.body.username = user.username
        req.body.userId = user._id
        next();
    }
    catch (e) {
        res.status(403).json({ msg: e })
    }
}

module.exports = { signinMiddleware, signupMiddleware, authMiddleware }