import { createPost, getAllPosts, getPost, deletePost } from "./posts.controller.js"

export const resolvers = {
    Query: {
        posts: () => getAllPosts(),
        post: (_, { id }) => getPost(id),
    },
    Mutation: {
        createPost: (_, { post }) => {
            const { authorId, comment, title, tv, tags, files } = post
            return createPost({ authorId, comment, title, tv, tags, files })
        },
        deletePost: (_, { postId, authorId, roomId }) => deletePost(postId, authorId, roomId)
    }
}