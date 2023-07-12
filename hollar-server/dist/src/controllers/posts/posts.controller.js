import { Post } from '../../models/posts.model.js';
import { getRoomByName, addRoom, getRoom } from '../rooms/rooms.controller.js';
import { getUser } from '../users/users.controller.js';
import { GraphQLError } from 'graphql';
import { User } from '../../models/users.model.js';
import { Room } from '../../models/rooms.model.js';
import { Reply } from '../../models/replies.model.js';
export async function getAllPosts() {
    return await Post.find({});
}
export async function getPost(id) {
    const post = await Post.findById(id).populate({ path: 'author room' }).exec();
    return post;
}
export async function getPostL(id) {
    const post = await Post.findById(id).exec();
    return post;
}
// createPost
export async function createPost(post) {
    const { tags, files, comment, authorId, title, tv } = post;
    const rooms = await getRoomByName(title);
    const user = await getUser(authorId);
    console.log(user);
    if (rooms.length && user) {
        const room = rooms[0];
        const newPost = await Post.create({ tags, files, comment, author: user.id, room: room.id });
        room.posts.push(newPost.id);
        user.posts.push(newPost.id);
        const followers = user.followers;
        // Queue System
        followers?.forEach(async (id) => {
            const follower = await getUser(id);
            follower?.feeds.push(newPost.id);
        });
        await room.save();
        await user.save();
        return newPost;
    }
    else {
        let room = await addRoom({ name: title, cover: tv.image.url, creator: authorId, tv: tv });
        room = room.id;
        const newPost = await Post.create({ tags, files, comment, author: authorId, room });
        room.posts.push(newPost.id);
        user?.posts.push(newPost.id);
        await room.save();
        await user?.save();
        return newPost;
    }
}
// deletePost
export async function deletePost(postId, authorId, roomId) {
    const post = await getPost(postId);
    const user = await getUser(authorId);
    const room = await getRoom(roomId);
    if (user && room) {
        if (post && post.author.equals(user.id)) {
            await User.updateOne({ _id: user.id }, { $pull: { posts: post.id } });
            await Room.updateOne({ _id: room.id }, { $pull: { posts: post.id } });
            user.save();
            room.save();
            return {
                message: 'deleted successfully',
                code: 400
            };
        }
    }
    else if (!post) {
        throw new GraphQLError('delete post error.', {
            extensions: {
                code: 'DELETE_POST_ERROR',
                err: 'Post not found'
            }
        });
    }
    else {
        throw new GraphQLError('delete post error.', {
            extensions: {
                code: 'DELETE_POST_ERROR',
                err: 'not authorized'
            }
        });
    }
}
// likePost
export async function likePost(postId, userId) {
    const user = await getUser(userId);
    const post = await getPost(postId);
    if (user && post) {
        await Post.updateOne({ _id: post.id }, { $pull: { likes: user.id } });
        post.likes.push(user.id);
        await post.save();
        console.log(post);
        return post;
    }
}
// unlikePost
export async function unlikePost(postId, userId) {
    const user = await getUser(userId);
    const post = await getPost(postId);
    if (user && post) {
        await Post.updateOne({ _id: post.id }, { $pull: { likes: user.id } });
        await post.save();
        console.log('unlike', post);
        return post;
    }
}
export async function getReply(id) {
    return await Reply.findById(id).exec();
}
export async function getReplyAddon(id) {
    console.log('kk');
    const reply = await Reply.findById(id).populate({
        path: 'author post treplies replies',
        strictPopulate: false
    });
    const post = getPost(String(reply?.post.id));
    return { post, reply };
}
// REPLIES
// likePost
export async function likeReply(replyId, userId) {
    const user = await getUser(userId);
    const reply = await getReply(replyId);
    console.log('liked0');
    if (user && reply) {
        console.log('liked');
        await Reply.updateOne({ _id: reply.id }, { $pull: { likes: user.id } });
        reply.likes.push(user.id);
        await reply.save();
        console.log(reply);
        return reply;
    }
}
// unlikePost
export async function unlikeReply(replyId, userId) {
    const user = await getUser(userId);
    const reply = await getReply(replyId);
    console.log('unliked');
    if (user && reply) {
        await Reply.updateOne({ _id: reply.id }, { $pull: { likes: user.id } });
        await reply.save();
        console.log('unlike', reply);
        return reply;
    }
}
export async function postWithAuthorReplies(id) {
    const post = await getPostL(id);
    const result = await Post.findById({ _id: id }).populate({
        path: 'replies',
        options: { sort: { 'created_at': -1 } },
        match: { author: { $eq: post?.author } },
        populate: {
            path: 'author'
        },
    }).exec();
    return result;
}
export async function getPostWithReplies(id, cursor, limit) {
    const post = await Post.findById(id).populate({
        path: 'author room'
    });
    if (post) {
        console.log('yh');
        if (!cursor || !cursor.length) {
            const result = await Post.findById(id).populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } },
                perDocumentLimit: limit,
                populate: {
                    path: 'author',
                },
                // match: { author: { $ne: post?.author } },
            });
            const replies = result?.replies;
            return replies;
        }
        else {
            const c = Number(cursor);
            const result = await Post.findById({ _id: post.id }).populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } },
                match: { createdAt: { $lt: c } },
                // match: { createdAt: { $lt: c }, author: { $ne: post?.author } },
                populate: {
                    path: 'author'
                },
                perDocumentLimit: limit
            }).exec();
            const replies = result?.replies;
            console.log(replies);
            return replies;
        }
    }
}
export async function getReplyWithReplies(id, cursor, limit) {
    const reply = await Reply.findById(id).populate({
        path: 'author room'
    });
    if (reply) {
        console.log('yh');
        if (!cursor || !cursor.length) {
            const result = await Reply.findById(id).populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } },
                perDocumentLimit: limit,
                populate: {
                    path: 'author',
                },
                // match: { author: { $ne: post?.author } },
            });
            const replies = result?.replies;
            return replies;
        }
        else {
            const c = Number(cursor);
            const result = await Reply.findById({ _id: reply.id }).populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } },
                match: { createdAt: { $lt: c } },
                // match: { createdAt: { $lt: c }, author: { $ne: post?.author } },
                populate: {
                    path: 'author'
                },
                perDocumentLimit: limit
            }).exec();
            const replies = result?.replies;
            console.log(replies);
            return replies;
        }
    }
}
export async function postReplies(id, cursor, limit) {
    const post = await getPostL(id);
    if (!cursor || !cursor.length) {
        const nid = Number(id);
        const result = await Post.findById({ _id: id }).populate({
            path: 'replies',
            options: { sort: { 'created_at': -1 } },
            match: { author: { $ne: post?.author } },
            populate: {
                path: 'author'
            },
            perDocumentLimit: limit
        }).exec();
        return result;
    }
    else {
        const c = Number(cursor);
        const result = await Room.findById({ _id: id }).populate({
            path: 'posts',
            options: { sort: { 'created_at': -1 } },
            match: { createdAt: { $lt: c }, author: { $ne: post?.author } },
            populate: {
                path: 'replies'
            },
            perDocumentLimit: limit
        }).exec();
        console.log(result);
        return result;
    }
}
export async function replyPost(postId, reply) {
    const user = await getUser(reply.authorId);
    const post = await getPostL(postId);
    console.log('post', post);
    if (user && post) {
        const createdReply = await Reply.create({ author: user.id, post: post.id, comment: reply.comment, files: reply.files, tags: reply.tags });
        await post.replies.push(createdReply.id);
        post.save();
        return createdReply;
    }
    else {
        throw new GraphQLError('post or user id invalid', {
            extensions: {
                code: 'REPLY_POST'
            }
        });
    }
}
export async function replyReply(replyId, reply) {
    const user = await getUser(reply.authorId);
    const headReply = await getReply(replyId);
    if (user && headReply) {
        const createdReply = await Reply.create({ author: user.id, post: headReply.post, treplies: headReply.treplies, comment: reply.comment });
        createdReply.treplies.push(headReply.id);
    }
}
// export async function getReply(replyId: string) {
//     return await Reply.findById(replyId).exec()
// }
