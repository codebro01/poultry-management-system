
import { verifyJWT } from "../utils/jwt.js";
import { GraphQLError } from "graphql";
import { customError } from "../utils/graphqlError.js";


export const authMiddleware = (context) => {
    
    const {token} = context.req?.cookies;

    if(!token) return customError('No Token provided', 'UNAUTHORIZED', 401)

    try {
        const decoded = verifyJWT({token});


        if(!decoded) return customError('Invalid Token provided', 'UNAUTHORIZED', 401)
    
    
        return decoded;
    }
    catch(err) {
        return customError(err.message || 'An error occured identifying user, please try loggin in again!!! ', 'UNAUTHORIZED', 401)
    }
}






export const RBAC = (user, requiredRole) => {
    if (!user || !user.role || user.role.length < 1) {
        throw new new GraphQLError('User is definitely no valid!!!!!', {
            extensions: {code: "UNAUTHORIZED", status: 401}
        });
    }

    // Ensure requiredRole is an array
    if (!Array.isArray(requiredRole)) {
        requiredRole = [requiredRole];
    }

    // Check if user has at least one required permission
    const hasRole = requiredRole.some((role) =>
        user.role.includes(role)
    );

    if (!hasRole) {
        throw new GraphQLError('User does not have the required permission to access this route', {
            extensions: {code: "FORBIDDEN", status: 403}
        });
    }
};
