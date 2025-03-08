import { nanoid } from 'nanoid';
import { userServices } from '../../services/userServices.js';
import { authMiddleware, RBAC } from '../../middlewares/authMiddleware.js';
import { productsServices } from '../../services/productsServices.js';
import { customError } from '../../utils/graphqlError.js';
import { StatusCodes } from 'http-status-codes';
import { orderServices } from '../../services/orderServices.js';
import { dashboardServices } from '../../services/dasboardServices.js';

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
        },

        // ! Orders Query

        listOrders: (_, args, context) => {
            return orderServices.getAllOrders();
        },

        // ! Dashboard Data Query
        getDashboardData: (_, args, context) => {
            console.log('hello')
            const user = authMiddleware(context);
            RBAC(user, 'admin')
            return dashboardServices.getDashboardData();
        }
    },
    Mutation: {


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
            const { name, price, description, age, healthStatus, weight, images, totalCost } = bird;
            return productsServices.addBirds({totalCost, name, price, description, age, healthStatus, weight, images });
        },

        //  * Add Birds
        editPoultryBird: (_, { id, edit }, context) => {
            console.log('entered update bird by admin', id, edit)

            const user = authMiddleware(context);
            RBAC(user, 'admin');

            const { name, price, description, age, healthStatus, weight, totalCost } = edit;
            return productsServices.updateBird({ id, name, price, description, age, healthStatus, weight, totalCost });
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
            const { types, pricePerTray, stock, images, eggStatus, totalCost } = egg;

            // const createdAt = Date.now().toString;
            // console.log(createdAt)
            return productsServices.addEggs({ types, pricePerTray, stock, images, eggStatus, totalCost });
        },

        //  * Edit Eggs
        editPoultryEgg: (_, { id, edit }, context) => {
            console.log('entered update bird by admin', id, edit)

            const user = authMiddleware(context);
            RBAC(user, 'admin');

            const { types, pricePerTray, stock, images, createdAt, eggStatus } = edit;
            return productsServices.updateEgg({ id, types, pricePerTray, stock, images, createdAt, eggStatus });

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
        },

        // ! Orders Mutation

        createOrder: (_, {customerName, customerEmail, customerPhone, customerAddress, category, items}) => {
            // const {productId, productName, quantity, price} = items;
            return orderServices.createOrder({customerAddress, customerName, customerEmail, customerPhone,category, items});
        }, 
        updateOrderStatus: (_, {id, status}, context) => {
            const user = authMiddleware(context);
            RBAC(user, 'admin', 'user');
            return orderServices.updateOrderStatus({id, status});
        }



    }







}