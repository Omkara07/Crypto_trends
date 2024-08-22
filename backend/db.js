const mongoose = require('mongoose');
const { object } = require('zod');
const Schema = mongoose.Schema

mongoose.connect("mongodb+srv://singhomkara07:cH2d1si0prP22zGf@cluster0.igjawzb.mongodb.net/cryp-to")

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
        lowercase: true
    },
    firstname: {
        type: String,
        trim: true,
        require: true
    },
    lastname: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    }
});

const watchSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    watchList : [{type: Object}]
})

const User = new mongoose.model('User',userSchema)
const WatchList = new mongoose.model('WatchList', watchSchema)

module.exports = {User, WatchList}