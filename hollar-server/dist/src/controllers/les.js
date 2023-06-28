import { merge } from 'lodash';
//typedef
import { typeDef as User } from './users/users.schema';
import { typeDef as Room } from './rooms/rooms.schema';
import { typeDef as Post } from './posts/posts.schema';
// resolvers
import { resolvers as userResolvers } from './users/users.resolvers';
import { resolvers as roomResolvers } from './rooms/rooms.resolvers';
import { resolvers as postResolvers } from './posts/posts.resolvers';
export const typeDefs = [User, Room, Post];
export const resolvers = merge(userResolvers, roomResolvers, postResolvers);
