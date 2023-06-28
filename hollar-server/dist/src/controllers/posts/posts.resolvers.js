import { addPost, getAllPosts, getPost, postsPaginator, deletePost } from "./posts.controller.js";
export const resolvers = {
    Query: {
        posts: () => getAllPosts(),
        post: (_, args) => getPost(args.id),
        paginatePost: (_, args) => postsPaginator(args.limit, args.pageNo)
    },
    Mutation: {
        createPost: (_, args) => {
            const { author, comment, room, date } = args;
            return addPost(author, comment, room, date);
        },
        removePost: (_, args) => deletePost(args.id)
    }
};
