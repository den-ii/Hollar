import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import _ from 'lodash';
//typedef
import { typeDef as User } from './controllers/users/users.schema.js';
import { typeDef as Room } from './controllers/rooms/rooms.schema.js';
import { typeDef as Post } from './controllers/posts/posts.schema.js';
// resolvers
import { resolvers as userResolvers } from './controllers/users/users.resolvers.js';
import { resolvers as roomResolvers } from './controllers/rooms/rooms.resolvers.js';
import { resolvers as postResolvers } from './controllers/posts/posts.resolvers.js';
const Query = `
  type Query {
    _empty: String
  }
`;
export const typeDefs = [Query, User, Room, Post];
export const resolvers = _.merge(userResolvers, roomResolvers, postResolvers);
const app = express();
app.use(cors());
app.use(helmet());
app.use('/api', (req, res) => {
    res.json('Hollar');
});
export default app;
