export const typeDef = `
    extend type Query {
        posts: [Post]
        post(id: ID!): Post
        paginatePost(limit: Int!, size: Int!): [Post]
    }
    input CreatePostInput {
        author: UserInput!
        date: String
        room: RoomInput!
        comment: String!
    }
    input UserInput{
        id: String!
        fullName: String
        username: String
        email: String
        avatar: String,
        color: String
        followers: [UserInput],
        follows: [UserInput]
        
    }
    input RoomInput{
        id: ID!
        cover: String
        description: String
        date: String
        creator: UserInput
    },
    type Mutation {
        createPost(input : CreatePostInput) : Post
        removePost(id: ID!) : Error
    }

    type Post {
        id: ID
        comment: String
        author: User
        date: String
        room: Room
        likes: [User]
        createdAt: String
        updatedAt: String
    }
`;
