import { GraphQLError } from "graphql";


export const customError = (message, code, status) => {
    return new GraphQLError(message, {
        extensions: {
            code,
            status
        }
    })
}