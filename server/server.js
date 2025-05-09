import 'dotenv/config';
import 'express-async-errors'
import { ApolloServer } from '@apollo/server';
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
import predictChickenHealthStatus from './routes/chickenHealthStatusModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from './routes/apiRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


const allowedDomains = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000', 'https://poultry-management-system-ten.vercel.app'];
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

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/upload', upload.array('images', 5), cloudinaryImageUploader);
app.use('/api/v1/predict', predictChickenHealthStatus)



app.use("/api", Router);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Handle SPA routing
});

// app.get('/api/check-cookie', )


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust accordingly
// });


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
    app.listen(5100, () => console.log('🚀 Awesome, app connected to port', 5100))

}

startServer();









