import { nanoid } from 'nanoid';
import { userServices } from '../../services/userServices.js';
import { authMiddleware, RBAC } from '../../middlewares/authMiddleware.js';
import { productsServices } from '../../services/productsServices.js';
import { customError } from '../../utils/graphqlError.js';
import { INTERNAL_SERVER_ERROR, StatusCodes } from 'http-status-codes';

const userId = nanoid(8);

export const resolvers = {
    Query: {

        // ! users Query

        users(_, args, context) {
            const user = authMiddleware(context);
            RBAC(user, 'admin')
            return userServices.getAllUsers();
        },

        // ! Poultry Birds Query

        poultryBirds: (_, args, context) => {
            return productsServices.getAllBirds();
        },

        poultryBird: (_, { id }) => {
            return productsServices.getSingleBird({ id })
        },



        // ! Poultry Eggs Query
        poultryEggs: (_, args, context) => {
            return productsServices.getAllEggs();
        },

        poultryEgg: (_, { id }) => {
            return productsServices.getSingleEgg({ id })
        },

        // ! Poultry Feed Query

        poultryFeeds: (_, args, context) => {
            return productsServices.getAllFeeds();
        },

        poultryFeed: (_, { id }) => {
            return productsServices.getSingleFeed({ id })
        }
    },
    Mutation: {

        // POV: async (_, { expectation }) => {
        //     const { dell_xps_13, rolls_Royce,
        //         G_wagon, five_Bedroom_Duplex, } = expectation;

        //     if (!dell_xps_13 || !rolls_Royce || !five_Bedroom_Duplex || !G_wagon)
        //         throw customError('Wetin I dey find never complete, grid harder!!!',
        //             "INTERNAL_SERVER_ERROR",
        //             StatusCodes.INTERNAL_SERVER_ERROR);
        //     return { message: "First batch of goals succedded, unto the next!" }

        // },

        // ! User Mutation
        createUser: async (_, { user }, context) => {
            return await userServices.createUser(context, {
                uid: userId,
                username: user.username,
                email: user.email,
                phoneNo: user.phoneNo,
                address: user.address,
                password: user.password,
                role: user.role,
            })
        },
        loginUser: (_, { username, password }, context) => {
            return userServices.loginUser(context, { username, password })
        },
        updateUser: (_, { id, user }) => {
            return userServices.updateUser({ id, user });
        },
        deleteUser: (_, { id }) => {
            userServices.deleteUser({ id });
            return userServices.getAllUsers();
        },

        // ! Poultry Birds Mutation

        //  * Add Birds
        addPoultryBird: (_, { bird }, context) => {
            console.log('entered create bird by admin')
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            const { name, price, description, age, healthStatus, weight, images } = bird;
            return productsServices.addBirds({ name, price, description, age, healthStatus, weight, images });
        },

        //  * Add Birds
        editPoultryBird: (_, { id, edit }, context) => {
            console.log('entered update bird by admin', id, edit)

            const user = authMiddleware(context);
            RBAC(user, 'admin');

            const { name, price, description, age, healthStatus, weight } = edit;
            return productsServices.updateBird({ id, name, price, description, age, healthStatus, weight });
        },

        // * Delete Poultry Bird

        deletePoultryBird: (_, { id }, context) => {
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            productsServices.deleteBird({ id });
            return productsServices.getAllBirds();
        },
        // ! Poultry Eggs Mutation


        //  * Add Eggs
        addPoultryEgg: (_, { egg }, context) => {
            console.log('entered create egg by admin')
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            const { types, pricePerTray, stock, images} = egg;

            // const createdAt = Date.now().toString;
            // console.log(createdAt)
            return productsServices.addEggs({ types, pricePerTray, stock, images});
        },

        //  * Edit Eggs
        editPoultryEgg: (_, { id, edit }, context) => {
            console.log('entered update bird by admin', id, edit)

            const user = authMiddleware(context);
            RBAC(user, 'admin');

            const { types, pricePerTray, stock, images, createdAt } = edit;
            return productsServices.updateEgg({ id, types, pricePerTray, stock, images, createdAt });

        },

        // * Delete Poultry Bird

        deletePoultryEgg: async (_, { id }, context) => {
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            await productsServices.deleteEgg({ id });
            return productsServices.getAllEggs();
        },





        // ! Poultry Feeds Mutation

        addPoultryFeed: (_, { feed }, context) => {
            console.log('entered create bird by admin')
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            const { name, types, weight, price, stock, description, images, isAvailable } = feed;
            return productsServices.addFeeds({ name, types, weight, price, stock, description, images, isAvailable });
        },

        //  * Add Birds
        editPoultryFeed: (_, { id, edit }, context) => {
            console.log('entered update bird by admin', id, edit)

            const user = authMiddleware(context);
            RBAC(user, 'admin');

            const { name, types, weight, price, stock, description, images, isAvailable } = edit;
            return productsServices.updateFeed({ id, name, types, weight, price, stock, description, images, isAvailable });
        },

        // * Delete Poultry Bird

        deletePoultryFeed: (_, { id }, context) => {
            const user = authMiddleware(context);
            RBAC(user, 'admin');
            productsServices.deleteFeed({ id });
            return productsServices.getAllFeeds();
        }
    }







}