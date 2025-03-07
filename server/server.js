import 'dotenv/config';
import 'express-async-errors'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express';
import { resolvers } from './graphql/resolvers/resolver.js';
import { typeDefs } from './graphql/schemas/schema.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { startDB } from './db/connectDb.js';
import cors from 'cors';
import { upload } from './config/multer.js';
import { cloudinaryImageUploader } from './utils/cloudinaryImageUploader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


const allowedDomains = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedDomains.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Origin blocked by Cors'))
        }
    },
    credentials: true,
    methods: ['POST', 'OPTIONS']
}))

app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Handle SPA routing
});

app.post('/upload', upload.array('images', 5), cloudinaryImageUploader);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust accordingly
});


const startServer = async () => {
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

startServer();









