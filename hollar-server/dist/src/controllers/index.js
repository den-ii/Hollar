import merge from 'lodash/merge';
//typedef
import { typeDef as User } from './users/users.schema.js';
import { typeDef as Room } from './rooms/rooms.schema.js';
import { typeDef as Post } from './posts/posts.schema.js';
// resolvers
import { resolvers as userResolvers } from './users/users.resolvers.js';
import { resolvers as roomResolvers } from './rooms/rooms.resolvers.js';
import { resolvers as postResolvers } from './posts/posts.resolvers.js';
export const typeDefs = [User, Room, Post];
export const resolvers = merge(userResolvers, roomResolvers, postResolvers);
