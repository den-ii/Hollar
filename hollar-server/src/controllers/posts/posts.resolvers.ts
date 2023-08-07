import { createPost, getAllPosts, getPostWithFilm, deletePost, likePost, unlikePost, replyPost, getPostReplies, unlikeReply, likeReply, replyReply, getReplyAddon, getReply, authorPostReplies, getReplyRepliesHeader, getReplyReplies, authorReplyReplies } from "./posts.controller.js"

export const resolvers = {
    Query: {
        posts: () => getAllPosts(),
        post: (_, { id, userId }) => getPostWithFilm(id, userId),
        reply: (_, { id, userId }) => getReplyAddon(id, userId),
        authorPostReplies: (_, { id, authorId, userId }) => authorPostReplies(id, authorId, userId),
        postReplies: (_, { id, authorId, userId, cursor, limit }) => getPostReplies(id, authorId, userId, cursor, limit),
        replyRepliesHeader: (_, { id, authorId, userId }) => getReplyRepliesHeader(id, authorId, userId),
        authorReplyReplies: (_, { id, authorId, userId }) => authorReplyReplies(id, authorId, userId),
        replyReplies: (_, { id, authorId, userId, cursor, limit }) => getReplyReplies(id, authorId, userId, cursor, limit),


    },
    Mutation: {
        createPost: (_, { post }) => {
            const { authorId, comment, title, tv, tags, files, cover } = post
            return createPost({ authorId, comment, title, tv, tags, files, cover })
        },
        deletePost: (_, { postId, authorId, roomId }) => deletePost(postId, authorId, roomId),
        likePost: (_, { postId, userId }) => likePost(postId, userId),
        unlikePost: (_, { postId, userId }) => unlikePost(postId, userId),
        likeReply: (_, { replyId, userId }) => likeReply(replyId, userId),
        unlikeReply: (_, { replyId, userId }) => unlikeReply(replyId, userId),
        replyPost: (_, { postId, reply }) => replyPost(postId, reply),
        replyReply: (_, { replyId, reply }) => replyReply(replyId, reply)

    }
}