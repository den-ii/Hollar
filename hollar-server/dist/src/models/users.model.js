import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    countrycode: {
        type: String,
        trim: true,
        required: true
    },
    confirmpassword: {
        type: String,
        trim: true
    },
    avatar: String,
    color: {
        type: String,
    },
    feeds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
