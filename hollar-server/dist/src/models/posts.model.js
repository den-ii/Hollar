import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    files: {
        type: [Object]
    },
    tags: {
        type: [String]
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });
export const Post = mongoose.model('Post', postSchema);
