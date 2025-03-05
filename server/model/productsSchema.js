import { Schema, model } from "mongoose";

const PoultryBirdsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please name is required"],
    },
    price: {
      type: Number,
      required: [true, "Please price is required"],
    },
    description: {
      type: String,
      required: [true, "Please description is required"],
    },
    age: {
      type: Number,
      required: [true, "Please age is required"],
    },
    healthStatus: {
      type: String,
      enum: ["healthy", "sick", "vaccinated"], // Matches GraphQL enum
      default: "healthy",
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const PoultryBirds = model("PoultryBirds", PoultryBirdsSchema);


const PoultryEggsSchema = new Schema({
    types: {
        type: String,
        required: true
    },
    pricePerTray: {
        type: Number, 
        required: true,
    },
    stock: {
        required: true, 
        type: Number,
    },
    images: {
        type: [String], 
        required: true
    }
}, {timestamps: true})

export const PoultryEggs = model('PoultryEggs', PoultryEggsSchema);


const PoultryFeedSchema = new Schema({
    name: {
        type: String, 
        requred: [true, 'Poultry feed name is required']
    },
    types: {
        type: String,
        enum: ['STARTER', 'GROWER', 'FINISHER', 'LAYER'],
        default: 'STARTER'
    }, 
    weight: {
        type: Number, 
    },
    price: {
        type: Number, 
        required: [true, 'Poultry feed price is required']
    }, 
    stock: {
        type: Number, 
        required: [true, 'Please insert feed stock'],
    }, 
    description: {
        type: String, 
    },
    images:{
        type: [String],
        required: [true, 'Please select an image file']
    }, 
    isAvailable: {
        type: Boolean, 
        default: true
    }
}, {timestamps: true})

export const PoultryFeeds = model('PoultryFeed', PoultryFeedSchema);
