export const typeDef = `
    extend type Query {
        posts: [Post]
        post(id: ID!): Post
    }

    type Mutation {
        createPost(post: createPostInput!): Post
        deletePost(postId: ID!, authorId: ID!, roomId: ID!): Message
    }
    
    input createPostInput{
        comment: String
        title: String
        authorId: ID!
        tv: ITv
        tags: [String]
        files: [String]
    }

    type Post {
        id: ID
        comment: String
        author: ID
        room: ID
        tags: [String]
        files: [String]
        likes: [ID]
        createdAt: String
        updatedAt: String
    }
    
    type PostWithUser {
        id: ID
        comment: String
        author: User
        room: ID
        tags: [String]
        files: [String]
        likes: [ID]
        createdAt: String
        updatedAt: String
    }

    type Message {
        message : String
        code: Int
    }
`;
