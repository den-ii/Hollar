// createUser(user: createAUser) : User

export const typeDef = `
    extend type Query {
        users: [User]
        user(id: ID!): User
        username(username: String!): User
        tryCreateUserWithEmail(user: createAUser!) : Error
        loginWithEmail(loginUser: loginUser!): loginReturn
        invalidUsername(username: String): Error
        invalidEmail(email : String): Error
    }
    type Mutation {
        removeUser(id: ID!) : deleteError
        verifyUser(token:String!) : Error
    }

    input loginUser {
        username: String
        email: String
        password: String!
    }
    type loginReturn {
        token: String
        user: User
    }
    
    input createAUser{
        fullName: String!
        email: String!
        username: String!
        color: String!
        country: String!
        countrycode: String!
        password: String
        id: ID, 
        age: Int
        avatar: String
    }

    type User {
        id: ID
        fullName: String
        username: String
        email: String
        avatar: String
        color: String
        followers: [ID]
        following: [ID]
        country: String
        countrycode: String!
        bookmarks: [ID]
        replies: [ID]
        notifications: [ID]
        createdAt: String
        updatedAt: String
    }

    type Reply {
        id: ID
        comment: [String]
        createdAt: String
        updatedAt: String
    }
    type deleteError {
        acknowledged: Boolean
        deletedCount: Int
    }
    type Error {
        message: String
        code: Int
    }
`;