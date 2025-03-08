import { PoultryBirds } from "../model/productsSchema.js";
import { PoultryEggs } from "../model/productsSchema.js";
import { PoultryFeeds } from "../model/productsSchema.js";
import { Order } from "../model/ordersSchema.js";


class DashboardServices {

    async getDashboardData () {

        // ! Get total Profit
        const [birdProfit, eggProfit] = await Promise.all([
            PoultryBirds.aggregate([
                {
                    $project: { profit: { $subtract: ["$price", "$totalCost"] } } // price - totalCost
                },
                {
                    $group: { _id: null, total: { $sum: "$profit" } } // Sum all profits
                }
            ]), 
            PoultryEggs.aggregate([
                {
                    $project: { profit: { $subtract: ["$pricePerTray", "$totalCost"] } } // price - totalCost
                },
                {
                    $group: { _id: null, total: { $sum: "$profit" } } // Sum all profits
                }
            ]), 
        ]);
        const totalBirdProfit = birdProfit[0]?.total || 0;
        const totalEggProfit = eggProfit[0]?.total || 0;
        const totalProfit = totalBirdProfit + totalEggProfit;

        // console.log('totalBirdProfit', totalBirdProfit)
        // console.log('totalEggProfit', totalEggProfit)
        // console.log('totalProfit', totalProfit)
        //! Get Total Pending Orders

        const pendingOrders = await Order.find({status: "PENDING"});
        const totalOrdersAmount = pendingOrders.reduce((acc, item) => acc + item.totalAmount, 0);



        const totalChicken = await PoultryBirds.countDocuments({healthStatus: {$ne: "dead"}});
        console.log(totalChicken)

        const totalChickenSold = await Order.countDocuments({category: "bird", status: "DELIVERED"});

        const dead = await PoultryBirds.countDocuments({healthStatus: "dead"});
        const mortalityRate = (dead/totalChicken) * 100;

        const totalEggsTray = await PoultryEggs.countDocuments({});
        const totalEggsCollected = totalEggsTray * 24;

        
        const totalCrateSold = await Order.countDocuments({category: 'egg', status: "DELIVERED"});
        const totalEggsSold = totalCrateSold * 24;

        const badEggs = await PoultryEggs.countDocuments({eggStatus: "bad"});

        const damageRate = ((badEggs * 24)/totalEggsCollected) * 100;
        const customerOrders = await Order.find({status: "PENDING"}).limit(10);

        // await PoultryEggs.deleteMany({ $or: [{ createdAt: { $exists: false } }, { createdAt: null }] });


        const eggsProducedPerMonth = await PoultryEggs.aggregate([
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,         // Remove _id
                month: "$_id",  // Rename _id to month
                total: 1    // Keep totalEggs
              }
            },
            { $sort: { month: 1 } }
          ]);
          
          const chickenSoldPerMonth = await Order.aggregate([
            {
              $match: { status: "DELIVERED", category: "bird" }
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$updatedAt" } },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,               // Remove _id
                month: "$_id",        // Rename _id to month
                total: 1  // Keep totalChickensSold
              }
            },
            { $sort: { month: 1 } }
          ]);
          
                    

        
        console.log(totalProfit, totalOrdersAmount, totalChicken, totalChickenSold, mortalityRate, totalEggsCollected, totalEggsSold, damageRate, customerOrders, eggsProducedPerMonth, chickenSoldPerMonth);
   
        
        return {totalProfit, totalOrdersAmount, totalChicken, totalChickenSold, mortalityRate, totalEggsCollected, totalEggsSold, damageRate, customerOrders, eggsProducedPerMonth, chickenSoldPerMonth};
    }


}

export const dashboardServices = new DashboardServices();