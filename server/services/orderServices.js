import { Order } from "../model/ordersSchema.js";
import { customError } from "../utils/graphqlError.js";
import { StatusCodes } from "http-status-codes";


class OrderServices {
    async getAllOrders() {
        try {
            const orders = await Order.find({});
            return orders;
        }
        catch (error) {
            throw customError('An error occured, please try again', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async createOrder({ customerAddress, customerName, customerEmail, customerPhone, category, items }) {
        try {
            console.log(category)
            const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            console.log('totalAmount', totalAmount)
            console.log('items', items)
            const order = new Order({ customerAddress, customerName, customerEmail, customerPhone, items, totalAmount, category });
            await order.save();

            return order;
        }
        catch (error) {
            console.log(error)
            throw customError('An error occured, please try again', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR)
        }

    }
    async updateOrderStatus({ id, status }) {
        try {

            const order = await Order.findOne({ _id: id });

            if (!order) throw customError(`Could not get an order with id: ${id}` , 'UNAUTHORIZED SERVER ERROR', StatusCodes.UNAUTHORIZED)


            order.status = status;
            await order.save();

            return order;
        }
        catch (error) {
            console.log(error)
            throw customError('An error occured, please try again', 'INTERNAL SERVER ERROR', StatusCodes.INTERNAL_SERVER_ERROR)
        }

    }
}

export const orderServices = new OrderServices();