import { PoultryBirds, PoultryEggs, PoultryFeeds } from "../model/productsSchema.js";
import { customError } from "../utils/graphqlError.js";
import { StatusCodes } from 'http-status-codes';


class ProductServices {

    // ! Birds logics
    async getAllBirds() {
        try {
            await PoultryBirds.deleteMany({totalCost: null});
            const birds = await PoultryBirds.find({});
            return birds;
        }
        catch (err) {
            return customError(err.message, "BAD REQUEST", 500)
        }
    }

    async getSingleBird({ id }) {
      try {
        if (!id) throw customError('Invalid Id ', 'BAD REQUEST', StatusCodes.BAD_REQUEST)
            console.log(id)
            const bird = await PoultryBirds.findOne({ _id: id });
            console.log(bird);
            return bird;
      }
      catch(error) {
        throw customError('Could not find bird', 'NOT FOUND', StatusCodes.NOT_FOUND)
      }
    }

    async addBirds({ totalCost, name, price, description, age, healthStatus, weight, images }) {
        try {
            const bird = new PoultryBirds({ totalCost, name, price, description, age, healthStatus, weight, images });
            await bird.save();
            return bird;
        }
        catch (err) {
            return customError(err.message, "BAD REQUEST", 500)

        }
    }

    async updateBird({ id, totalCost, name, price, description, age, healthStatus, weight }) {
        console.log(id)
        if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);

        const bird = await PoultryBirds.findByIdAndUpdate({ _id: id }, { totalCost, name, price, description, age, healthStatus, weight, }, { new: true, runValidators: true });
        console.log(bird)
        return bird

    }

    async deleteBird({ id }) {
        try {
            if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
            const deletedBird = await PoultryBirds.findByIdAndDelete({ _id: id });
            return deletedBird;
        }
        catch(error) {
            throw customError('An error occured, while deleting the bird, please try again', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    // ! Eggs Logic
    async getAllEggs() {
        try {
            const eggs = await PoultryEggs.find({});
            return eggs;
        }
        catch (err) {
            throw err || customError('An error occured getting all eggs', "BAD REQUEST", 500)
        }
    }

    async getSingleEgg({ id }) {
        if (!id) throw customError('Invalid Id ', 'BAD REQUEST', StatusCodes.BAD_REQUEST)
        console.log(id)
        const egg = await PoultryEggs.findOne({ _id: id });
        console.log(egg);
        return egg;
    }

    async addEggs({ types, pricePerTray, stock, images, eggStatus }) {
        try {
            const egg = new PoultryEggs({ types, pricePerTray, stock, images, eggStatus });
            await egg.save();

            let { createdAt } = egg;
            createdAt = createdAt.toISOString().split("T")[0]
            console.log(createdAt)
            return {
                id: egg._id,
                types: egg.types,
                pricePerTray: egg.pricePerTray,
                stock: egg.stock,
                images: egg.images,
                eggStatus: egg.eggStatus,
                createdAt
            }
        }
        catch (err) {
            return customError(err.message, "BAD REQUEST", 500)

        }
    }

    async updateEgg({ id, types, pricePerTray, stock, images, eggStatus }) {
        try {
            console.log(id)
            if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
    
            const egg = await PoultryEggs.findByIdAndUpdate({ _id: id }, { types, pricePerTray, stock, images, eggStatus}, { new: true, runValidators: true });
            let eggObject = egg.toObject();
            eggObject.createdAt = eggObject.createdAt.toISOString
            ().split("T")[0]
            eggObject.id = eggObject._id;
            console.log(eggObject)
            return eggObject
        }
        catch(error) {
            customError('An error occured updating the egg, please try again', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
        }

    }

    async deleteEgg({ id }) {
        try {
            if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
            const deletedEgg = await PoultryEggs.findByIdAndDelete({ _id: id });
            console.log(deletedEgg)
        }
        catch(error) {
            console.log(error)
            throw customError('An error occured deleting egg, egg id is invalid', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
        }
    }



    // !Feeds Logic
    async getAllFeeds() {
        try {
            const feeds = await PoultryFeeds.find({});
            return feeds;
        }
        catch (err) {
            return err || customError('An error occured getting all eggs', "BAD REQUEST", 500)
        }
    }

    async getSingleFeed({ id }) {
     try {
        if (!id) throw customError('Invalid Id ', 'BAD REQUEST', StatusCodes.BAD_REQUEST)
            console.log(id)
            const feed = await PoultryFeeds.findOne({ _id: id });
            console.log(feed);
            return feed;
     }
     catch(error) {
        throw customError('An error occured finding item, please try again', 'NOT FOUND', StatusCodes.NOT_FOUND)
     }
    }

    async addFeeds({ name, types, weight, price, stock, description, images, isAvailable }) {
        try {
            const feed = new PoultryFeeds({ name, types, weight, price, stock, description, images, isAvailable });
            await feed.save();
            console.log(feed)

            return feed
        }
        catch (err) {
            return customError(err.message, "BAD REQUEST", 500)

        }
    }

    async updateFeed({ id, name, types, weight, price, stock, description, images, isAvailable }) {
      try {
        console.log(id)
        if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);

        const feed = await PoultryFeeds.findByIdAndUpdate({ _id: id }, { name, types, weight, price, stock, description, images, isAvailable }, { new: true, runValidators: true });
        console.log(feed)
        return feed
      } catch (error) {
        throw customError('An error occured updating the feed', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR);
      }

    }

    async deleteFeed({ id }) {
        try {
            if (!id) throw customError('Invalid Id', 'BAD REQUEST', StatusCodes.BAD_REQUEST);
            const deletedFeed = await PoultryFeeds.findByIdAndDelete({ _id: id });
            return deletedFeed;
        }
        catch(error) {
            throw customError('An error occured while deleting feed, Please try again', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

export const productsServices = new ProductServices();