import {Schema, model} from 'mongoose';


const OrderItemSchema = new Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
  });


const OrderSchema = new Schema({
    customerUsername: {
        type: String, 
        required: [true, "Customer's name is required"]
    },
    customerEmail: {
        type: String, 
        required: [true, "Customer's email is required"]
    },
    items: {
        type: [OrderItemSchema],
        required: true
    },
    totalAmount: {
        type: Number, 
        required: true,

    }, 
    status: {
        type: String, 
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'],
        default: 'PENDING'
    }, 
    address: {
        type: String,
        required: true,
    }

})

export const Order = model('Order', OrderSchema);