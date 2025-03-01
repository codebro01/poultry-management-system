import {nanoid} from 'nanoid';
import { userServices } from '../../services/userServices.js';
import { authMiddleware, RBAC } from '../../middlewares/authMiddleware.js';
import { productsServices } from '../../services/productsServices.js';

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
        }



        // ! Poultry Eggs Query




        // ! Poultry Feed Query
    },
    Mutation: {

        // ! User Mutation
        createUser: async (_, {user}, context)  => {
           return await userServices.createUser(context, {
                uid:userId,
                username: user.username,
                email: user.email,
                phoneNo: user.phoneNo,
                address: user.address, 
                password: user.password, 
                role: user.role, 
            })
        },
        loginUser: (_, {username, password}, context) => {
            return userServices.loginUser(context, {username, password})
        },
        updateUser: (_, {id, user}) => {
            return userServices.updateUser({id, user});
        },
        deleteUser: (_, {id}) => {
            userServices.deleteUser({id});
            return userServices.getAllUsers();
        },

         // ! Poultry Birds Mutation
    addPoultryBird:(_, {bird}, context) => {
        console.log('entered here after admin')
        const user = authMiddleware(context);
        RBAC(user, 'admin');
        const {name, price, description, age, healthStatus, weight, images} = bird;
         return productsServices.addBirds({name, price, description, age, healthStatus, weight, images});
    }

        // ! Poultry Eggs Mutation





    // ! Poultry Feeds Mutation
    }


   




}