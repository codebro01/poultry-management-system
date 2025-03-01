import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from './_db.js'
//types 

import { typeDefs } from './schema.js';


const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        review(_, {id}) {
            return db.reviews.find(review => review.id === id)
        },
        game(_, {id}) {
            return db.games.find(game => game.id === id)
        },
        author(_, {id}) {
            return db.authors.find(author => author.id === id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.find(g => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, {id}) {
            db.games = db.games.filter(game => game.id !== id);
            return db.games;
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game);
            return game
           
        },
        updateGame(_, args) {
            db.games = db.games.map(g => {
                if(g.id === args.id) {
                    return {...g, ...args.edits}
                }
                return g
            })
            return db.games.find(g => g.id === args.id)
        }
    }
}




const server = new ApolloServer({
    typeDefs, 
    resolvers
});

const startServer = async () => {

    const {url} = await startStandaloneServer(server, {
        listen: {port: 4000}
    })
    
    console.log('server is listening at port', 4000)
}

startServer();
