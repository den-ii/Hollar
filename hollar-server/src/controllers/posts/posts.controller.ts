import mongoose from 'mongoose';
import { Post } from '../../models/posts.model.js'
import { getRoomByName, addRoom, getRoom } from '../rooms/rooms.controller.js'
import { getUser } from '../users/users.controller.js';
import { GraphQLError } from 'graphql';
import { User } from '../../models/users.model.js';
import { Room } from '../../models/rooms.model.js';
import { Reply } from '../../models/replies.model.js';
import { getPostPipeline, authorPostRepliesPipeline, postRepliesPipeline, replyRepliesHeader, getReplyPipeline, authorReplyRepliesPipeline, replyRepliesPipeline } from './pipelines.js'

export async function getAllPosts() {
    return await Post.find({})
}

export async function getPost(id: string, userId?: string) {
    const post = await Post.findById(id).exec()
    return post
}
export async function getPostWithFilm(id: string, userId?: string) {
    const post = await getPostPipeline(id, userId)
    console.log(post)
    return post
}

// createPost
export async function createPost(post: { comment: string, authorId: string, title: string, tv?: any, tags: [string], cover: string, files: [any] }) {
    const { tags, files, comment, authorId, title, tv } = post
    const rooms = await getRoomByName(title)
    console.log(authorId)
    const user = await getUser(authorId)
    console.log(user)
    if (rooms.length && user) {
        const room = rooms[0]
        const newPost = await Post.create({ tags, files, comment, author: user.id, room: room.id })
        room?.posts?.push(newPost.id)
        user?.posts?.push(newPost.id)
        const followers = user.followers
        // Queue System
        followers?.forEach(async (id: any) => {
            const follower = await getUser(id)
            follower?.feeds.push(newPost.id)
        })
        await room.save();
        await user.save();
        return newPost
    }
    else {
        let room = await addRoom({ name: title, cover: tv.image.url, creator: authorId, tv: tv })
        room = room.id
        const newPost = await Post.create({ tags, files, comment, author: authorId, room })
        console.log('addRoom', room)
        console.log('post', newPost)
        room?.posts?.push(newPost.id)
        user?.posts?.push(newPost.id)
        await room.save()
        await user?.save()
        return newPost
    }
}

// deletePost
export async function deletePost(postId: string, authorId: string, roomId: string) {
    const post = await getPost(postId)
    const user = await getUser(authorId)
    const room = await getRoom(roomId)

    if (user && room) {
        if (post && post.author.equals(user.id)) {
            await User.updateOne({ _id: user.id }, { $pull: { posts: post.id } });
            await Room.updateOne({ _id: room.id }, { $pull: { posts: post.id } });
            user.save()
            room.save()

            return {
                message: 'deleted successfully',
                code: 400
            }
        }
    }
    else if (!post) {
        throw new GraphQLError('delete post error.', {
            extensions: {
                code: 'DELETE_POST_ERROR',
                err: 'Post not found'
            }
        })
    }
    else {
        throw new GraphQLError('delete post error.', {
            extensions: {
                code: 'DELETE_POST_ERROR',
                err: 'not authorized'
            }
        })
    }
}

// likePost
export async function likePost(postId: string, userId: string) {
    const user = await getUser(userId)
    const post = await getPost(postId)
    if (user && post) {
        await Post.updateOne({ _id: post.id }, { $pull: { likes: user.id } });
        post.likes.push(user.id)
        await post.save()
        console.log(post)
        return post
    }
}

// unlikePost
export async function unlikePost(postId: string, userId: string) {
    const user = await getUser(userId)
    const post = await getPost(postId)
    if (user && post) {
        await Post.updateOne({ _id: post.id }, { $pull: { likes: user.id } });
        await post.save()
        console.log('unlike', post)
        return post
    }
}


export async function getReply(id) {
    return await Reply.findById(id).exec()
}

export async function getReplyAddon(id: string, userId?: string) {
    const result = getReplyPipeline(id, userId)
    return result
}
// REPLIES
// likePost
export async function likeReply(replyId: string, userId: string) {
    const user = await getUser(userId)
    const reply = await getReply(replyId)
    console.log('liked0')

    if (user && reply) {
        console.log('liked')

        await Reply.updateOne({ _id: reply.id }, { $pull: { likes: user.id } });
        reply.likes.push(user.id)
        await reply.save()
        console.log(reply)
        return reply
    }
}

// unlikePost
export async function unlikeReply(replyId: string, userId: string) {
    const user = await getUser(userId)
    const reply = await getReply(replyId)
    console.log('unliked')
    if (user && reply) {
        await Reply.updateOne({ _id: reply.id }, { $pull: { likes: user.id } });
        await reply.save()
        console.log('unlike', reply)
        return reply
    }
}


export async function authorPostReplies(id: string, authorId: string, userId?: string) {
    const result = await authorPostRepliesPipeline(id, authorId, userId)
    return result

}
export async function authorReplyReplies(id: string, authorId: string, userId?: string) {
    const result = await authorReplyRepliesPipeline(id, authorId, userId)
    return result

}

export async function getPostReplies(id: string, authorId: string, userId?: string, cursor?: string, limit?: number) {
    const result = await postRepliesPipeline(id, authorId, userId, cursor, limit)
    return result
}
export async function getReplyRepliesHeader(id: string, authorId: string, userId?: string) {
    const result = await replyRepliesHeader(id, authorId, userId)
    return result
}

export async function getReplyReplies(id: string, authorId: string, userId?: string, cursor?: string, limit?: number) {
    const result = await replyRepliesPipeline(id, authorId, userId, cursor, limit)
    return result
}


export async function replyPost(postId: string, reply: { authorId: string, comment: string, files: any, tags: [string] }) {

    const user = await getUser(reply.authorId)
    const post = await getPost(postId)
    console.log('post', post)
    if (user && post) {
        const createdReply = await Reply.create({ author: user.id, post: post.id, comment: reply.comment, files: reply.files, tags: reply.tags })
        await post.replies.push(createdReply.id)
        post.save()
        return createdReply
    }
    else {
        throw new GraphQLError('post or user id invalid', {
            extensions: {
                code: 'REPLY_POST'
            }
        })
    }


}

export async function replyReply(replyId: string, reply: { authorId: string, comment: string, files: string, tags: [string] }) {
    const user = await getUser(reply.authorId)
    const headReply = await getReply(replyId)
    if (user && headReply) {
        const createdReply = await Reply.create({ author: user.id, post: headReply.post, treplies: headReply.treplies, comment: reply.comment })
        createdReply.lastReply = new mongoose.Types.ObjectId(replyId)
        createdReply.treplies.push(headReply.id)
        createdReply.save()
        headReply.replies.push(createdReply.id)
        headReply.save()
        console.log(createdReply)
        return createdReply
    }

}

// export async function getReply(replyId: string) {
//     return await Reply.findById(replyId).exec()
// }