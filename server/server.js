import 'dotenv/config';
import 'express-async-errors'
import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {expressMiddleware} from '@apollo/server/express4'
import express from 'express';
import { resolvers } from './graphql/resolvers/resolver.js';
import { typeDefs } from './graphql/schemas/schema.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { startDB } from './db/connectDb.js';
const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
const startServer = async() => {
    await startDB();
    const server = new ApolloServer({
        typeDefs, 
        resolvers, 
});
    await server.start();

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }) 
    }))
    app.listen(5000, () => console.log('🚀 Awesome, app connected to port', 5000))
    
}
// {
//     context: async ({req}) => {
//         const user = authMiddleware(req);
//         return user;
//     }
// }
startServer()







