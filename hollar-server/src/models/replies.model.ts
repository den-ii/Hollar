import mongoose from 'mongoose'


const replySchema = new mongoose.Schema({
    post:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: {
        type: String
    }
},
    { timestamps: true }

)