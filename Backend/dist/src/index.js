import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
import { prisma } from '../prisma/db.js';
import { typeDefs } from './apollo/type-defs.js';
import { resolvers } from './apollo/resolvers.js';
// import { IncomingMessage } from 'http';
import { decodeAuthHeader } from './auth.js';
import { getLoginSession } from './lib/auth.js';
const { json } = pkg;
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
await server.start();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (e.g., cookies)
}));
app.use('/graphql', json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        const token = req && req.headers.authorization
            ? decodeAuthHeader(req.headers.authorization)
            : null;
        const session = await getLoginSession(req);
        return {
            prisma,
            userId: token?.userId,
            session,
            req,
            res,
        };
    },
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
