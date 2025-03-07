// import {gql} from 'graphql-tag'

export const typeDefs =`#graphql
#********************* User*******************************   

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        address: String!
        phoneNo: Int!
        role: Role!
        token: String!
        uid: String!
    }
    enum Role {
        admin
        user
    }

    type AuthPayload {
        user: User
        token: String!
    }

    type Query {
        users: [User!]
        user(id: ID!): User 
        me: User
    }

    type Mutation {
        createUser(user:AddUserInput):  User
        loginUser(username: String!, password: String!): AuthPayload
        updateUser(id: ID!, user: updateUserInput): User
        deleteUser(id:ID!): [User]
    }

    input AddUserInput {
        username: String!
        email: String!
        password: String!
        address: String!
        phoneNo: Int!
        role: Role!
    }
    input updateUserInput {
        username: String
        email: String
        address: String
    }


    #********************* Product ******************************* 


    scalar Upload


    type PoultryBirds {
        id: ID!
        name: String!
        price: Float!
        description: String!
        age: Int!
        healthStatus: HealthStatus!
        createdAt: String!
        weight: String!
        images: [String!]!
        totalCost: Float
    }

    enum HealthStatus {
        healthy
        sick
        vaccinated
        dead
    }

    type Query {
        poultryBirds: [PoultryBirds!]
        poultryBird(id: ID! ): PoultryBirds
    }

    type Mutation {
        addPoultryBird(bird: PoultryBirdInput): PoultryBirds
        editPoultryBird(id: ID!, edit: EditPoultryBirdInput): PoultryBirds
        deletePoultryBird(id:ID!): [PoultryBirds]
    }

    input PoultryBirdInput {
    name: String!
    price: Float!
    description: String!
    age: Int!
    healthStatus: HealthStatus!
    weight: Int!
    totalCost: Int!
    images: [Upload!]!
}

input EditPoultryBirdInput {
    name: String
    price: Float
    description: String
    age: Int
    healthStatus: HealthStatus
    weight: Int
    images: [String!]
    totalCost: Int!

}

enum eggStatusValue {
    good
    bad
}

    type PoultryEggs {
        id: ID!
        types: EggTypes!
        pricePerTray: Float!
        stock: Int!
        eggStatus: eggStatusValue
        images: [String!]!
        createdAt: String!
    }

    enum EggTypes {
        table
        fertilized
    }

    type Query {
        poultryEggs: [PoultryEggs!]
        poultryEgg(id: ID!): PoultryEggs
    }

    type Mutation {
        addPoultryEgg(egg: AddPoultryEggInput): PoultryEggs!
        editPoultryEgg(id: ID!, edit: EditPoultryEggInput): PoultryEggs!
        deletePoultryEgg(id: ID!): [PoultryEggs]
    }

    input AddPoultryEggInput {
        types: String!
        pricePerTray: Float!
        stock: Int!
        images: [String!]!
        eggStatus: String!
    }
    input EditPoultryEggInput {
        types: String
        pricePerTray: Float
        stock: Int
        images: [String!]
        eggStatus: String!
    }

    type PoultryFeeds {
        id: ID!
        name: String!
        types: FeedType!
        weight: Float! # Weight in kg per bag
        price: Float!
        stock: Int! # Number of bags available
        description: String
        images: [String!]! # Array of image URLs
        isAvailable: Boolean!
        createdAt: String!
}

    enum FeedType {
        STARTER
        GROWER
        FINISHER
        LAYER
}

    type Query {
        poultryFeeds: [PoultryFeeds!]!
        poultryFeed(id: ID!): PoultryFeeds!
    }

type Mutation {
    addPoultryFeed(feed: AddFeedsInput): PoultryFeeds!
    editPoultryFeed(id: ID!, edit: EditFeedsInput): PoultryFeeds!
    deletePoultryFeed(id: ID!): [PoultryFeeds]
}




input AddFeedsInput {
    name: String!
    types: FeedType!
    weight: Float! # Weight in kg per bag
    price: Float!
    stock: Int! # Number of bags available
    description: String
    images: [String!]! # Array of image URLs
    isAvailable: Boolean!
}


input EditFeedsInput {
    name: String
    types: FeedType
    weight: Float # Weight in kg per bag
    price: Float
    stock: Int! # Number of bags available
    description: String
    images: [String!] # Array of image URLs
    isAvailable: Boolean
}


#************************ order *****************************

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELED
}

type OrderItem {
  productId: ID!
  productName: String!
  quantity: Int!
  price: Float!
}

enum OrderCategory {
    bird
    egg
}
type Order {
  id: ID!
  customerName: String!
  customerEmail: String!
  items: [OrderItem!]!
  totalAmount: Float!
  status: OrderStatus!
  createdAt: String!
  updatedAt: String!
  customerAddress: String!
  customerPhone: String!
  category: OrderCategory
}



type Query {
  getOrder(id: ID!): Order
  listOrders(status: OrderStatus): [Order!]!
}

type Mutation {
  createOrder(
    customerName: String!
    customerEmail: String!
    customerPhone: String!
    customerAddress: String!
    category: String!
    items: [OrderItemInput!]!
  ): Order!

  updateOrderStatus(id: ID!, status: OrderStatus!): Order!
}

input OrderItemInput {
  productId: ID!
  productName: String!
  quantity: Int!
  price: Float!
}

type totalPerMonth {
    month: String!
    total: Int!
}


type DashboardData {
    totalProfit: Int!
    # yearlyProfitPercent: Int!
    customerOrders: [Order!]! 
    totalOrdersAmount: Int!
    deliveryRating: Int!
    totalChicken: Int!
    totalChickenSold: Int!
    mortalityRate: Float!
    totalEggsCollected: Int!
    totalEggsSold: Int!
    damageRate: Float!
    eggsProducedPerMonth: [totalPerMonth!]!
    chickenSoldPerMonth: [totalPerMonth!]!
}

type Query {
    getDashboardData: DashboardData!
}





`


