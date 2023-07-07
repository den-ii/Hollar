import { Post } from '../../models/posts.model.js';
import { getRoomByName, addRoom, getRoom } from '../rooms/rooms.controller.js';
import { getUser } from '../users/users.controller.js';
import { GraphQLError } from 'graphql';
import { User } from '../../models/users.model.js';
import { Room } from '../../models/rooms.model.js';
export async function getAllPosts() {
    return await Post.find({});
}
export async function getPost(id) {
    return await Post.findById(id).exec();
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
        const liked = await post.likes.find(user.id);
        if (liked) {
            await Post.updateOne({ _id: post.id }, { $pull: { likes: user.id } });
        }
        else {
            post.likes.push(user.id);
        }
    }
}
