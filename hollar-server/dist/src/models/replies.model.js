import mongoose from 'mongoose';
const replySchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    treplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    files: [Object],
    comment: {
        type: String
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });
export const Reply = mongoose.model('Reply', replySchema);
