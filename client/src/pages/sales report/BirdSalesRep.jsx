import { SalesReportComponent } from "../../components/salesReportComponent";
import {gql, useQuery} from '@apollo/client';
import React, { useEffect, useState } from 'react'

export const BirdSalesRep = () => {

  const [data, setData] = useState([])

  const BIRDQUERIES = gql`
  query DashboardDataQuery {
getDashboardData {
monthlyChickenSalesChart {
  totalProfit
  totalBirdsSold
  month
}
totalChickenSold
totalBirdProfit
}
}
`


const {data: queryData, error: queryError, loading: queryLoading} = useQuery(BIRDQUERIES)
console.log('queryError', queryError)

useEffect(() => {
  if(queryData) {
    
    setData(queryData.getDashboardData.monthlyChickenSalesChart)
  }
}, [queryData])

const salesData = [
  { id: 1, month: "Jan", chickensSold: 120, revenue: 2400 },
  { id: 2, month: "Feb", chickensSold: 98, revenue: 2100 },
        { id: 3, month: "Mar", chickensSold: 150, revenue: 3200 },
        { id: 4, month: "Apr", chickensSold: 80, revenue: 1800 },
        { id: 5, month: "May", chickensSold: 170, revenue: 3500 },
        { id: 6, month: "Jun", chickensSold: 200, revenue: 4000 },
      ];
      console.log('queryData', queryData?.getDashboardData) 
      return (
    <SalesReportComponent salesData={data} totalSoldTitle={'Total Chicken Sold'} totalRevenTitle={'Total Revenue'} totalItemSold={data?.totalBirdsSold} totalRevenue={data?.totalBirdProfit} queryLoading = {queryLoading} />
  )
}
