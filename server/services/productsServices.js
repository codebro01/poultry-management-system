import { PoultryBirds, PoultryEggs, PoultryFeeds } from "../model/productsSchema.js";
import { customError } from "../utils/graphqlError.js";

class ProductServices {
    async getAllBirds() {
        try {
            const birds = await PoultryBirds.find({});
            return birds;
        }
        catch (err) {
            return customError(err.message, "BAD REQUEST", 500)
        }
    }

    async addBirds({name, price, description, age, healthStatus, weight, images}) {
        try {
            const bird = new PoultryBirds({name, price, description, age, healthStatus, weight, images});
            await bird.save();
            return bird;
        }
        catch(err) {
            return customError(err.message, "BAD REQUEST", 500)

        }
    }
}

export const productsServices = new ProductServices();