import { SalesReportComponent } from "../../components/salesReportComponent";


import React from 'react'

export const EggSalesRep = () => {


    const salesData = [
        { id: 1, month: "Jan", chickensSold: 120, revenue: 2400 },
        { id: 2, month: "Feb", chickensSold: 98, revenue: 2100 },
        { id: 3, month: "Mar", chickensSold: 150, revenue: 3200 },
        { id: 4, month: "Apr", chickensSold: 80, revenue: 1800 },
        { id: 5, month: "May", chickensSold: 170, revenue: 3500 },
        { id: 6, month: "Jun", chickensSold: 200, revenue: 4000 },
      ];
  return (
    <SalesReportComponent salesData={salesData} totalSoldTitle={'Total Egg Sold'} totalRevenTitle={'Total Revenue'} />
  )
}
