// IMPORTS
import { getAllUsers, getUser, deleteUser, findUser, tryEmailCreateUser, parseEmailCreateUser, loginWithEmail, invalidUsername, invalidEmail, editProfile } from './users.controller.js';
// RESOLVERS
export const resolvers = {
    Query: {
        users: () => getAllUsers(),
        user: (_, { id }) => getUser(id),
        username: (_, { username }) => findUser(username),
        invalidUsername: (_, { username }) => invalidUsername(username),
        invalidEmail: (_, { email }) => invalidEmail(email),
        tryCreateUserWithEmail: (_, { user }) => tryEmailCreateUser(user),
        loginWithEmail: (_, { loginUser }) => loginWithEmail(loginUser)
    },
    Mutation: {
        verifyUser: (_, { token }) => parseEmailCreateUser(token),
        removeUser: (_, { id }) => {
            return deleteUser(id);
        },
        editProfile: (_, { profile }) => editProfile(profile)
    }
};
