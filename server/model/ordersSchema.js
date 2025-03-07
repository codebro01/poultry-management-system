import {Schema, model} from 'mongoose';


const OrderItemSchema = new Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  });


const OrderSchema = new Schema({
    customerName: {
        type: String, 
        required: [true, "Customer's name is required"]
    },
    customerEmail: {
        type: String, 
        required: [true, "Customer's email is required"]
    },
    customerPhone: {
        type: String, 
        required: [true, "Customer's Phone is required"]
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
        default: 'DELIVERED'
    }, 
    customerAddress: {
        type: String,
        required: true,
    }, 
    category: {
        type: String, 
        enum: ["bird", "egg"], 
        required: true
    }


}, {timestamps: true})

export const Order = model('Order', OrderSchema);