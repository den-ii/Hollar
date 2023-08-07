export const typeDef = `
    extend type Query {
        posts: [Post]
        post(id: ID!, userId: ID): Post2
        reply(id: ID!, userId: ID): Reply
        authorPostReplies(id:ID!, authorId: ID!, userId:ID): [Reply]
        postReplies(id:ID!, authorId: ID!,userId: ID, cursor: String, limit:Int): [Reply]
        replyRepliesHeader(id: ID!, authorId: ID!, userId: ID ): replyHeader
        authorReplyReplies(id:ID!, authorId: ID!, userId:ID): [Reply]
        replyReplies(id:ID!, authorId: ID!,userId: ID, cursor: String, limit:Int): [Reply]
    }

    type Mutation {
        createPost(post: createPostInput!): Post
        deletePost(postId: ID!, authorId: ID!, roomId: ID!): Message
        likePost(postId: ID!, userId: ID!): Post
        unlikePost(postId: ID!, userId: ID!): Post
        likeReply(replyId: ID!, userId: ID!): Reply
        unlikeReply(replyId: ID!, userId: ID!): Reply
        replyPost(postId: ID!, reply: Ireply!): PostReply
        replyReply(replyId: ID!, reply: Ireply!): PostReply

    }
    
    type replyHeader{
        id : ID,
        post: Post2
        treplies: [Reply] 
    }

    type PostReply {
        id: ID,
        treplies: [String],
        files: [String],
        author: User
        post: ID
        likes: [ID]
        replies: [ID]
        comment: String
        tags: [String]
    }

    input createPostInput{
        comment: String
        title: String
        authorId: ID!
        tv: ITv
        tags: [String]
        files: [String]
        cover: String
    }

    input Ireply {
        id : ID
        comment: String
        tags: [String]
        post: ID
        likes: [ID]
        files: [Ifile]
        authorId: ID
        treplies: [ID]
    }

    type Post {
        id: ID
        comment: String
        author: User
        room: Room
        tags: [String]
        files: [file]
        replies: [Reply]
        likes: [User]
        createdAt: String
        updatedAt: String
    }
    
    type Post2 {
        id: ID
        comment: String
        authorDetails: User
        roomDetails: Room
        tags: [String]
        files: [file]
        replies: [Reply]
        likes: [ID]
        userLiked: Int
        likesCount: Int
        replyCount: Int
        createdAt: String
    }

    type file {
        type: String
        src: String
    }
    
    input Ifile {
        type: String
        src: String
    }
    type PostReplies {
        post: Post
        reply: [Reply]
    }
    type Reply{
        id: ID
        authorDetails: User
        comment: String
        author: User
        post: ID
        tags: [String]
        files: [String]
        treplies: [ID]
        replies: [Reply]
        likes: [User]
        likesCount: Int
        userLiked: Int
        replyCount: Int
        createdAt: String
    }

    type PostWithUser {
        id: ID
        comment: String
        author: User
        room: ID
        tags: [String]
        files: [String]
        likes: [User]
        replies: [ID]
        createdAt: String
        updatedAt: String
    }

    type Message {
        message : String
        code: Int
    }
`;
