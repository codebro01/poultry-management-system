import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Card, CardContent } from '@mui/material';
import { StatBox } from '../components/cards';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { OrderCard } from '../components/verticalCard';
import { PoultryReportCard } from '../components/poultryReportCard';
import EggIcon from "@mui/icons-material/Egg"; // Example icon for poultry
import { LineChart } from '../components/lineChart';
import { FaDollarSign, FaDrumstickBite } from 'react-icons/fa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GiChicken } from 'react-icons/gi';
import { useQuery, gql } from '@apollo/client';





export const Dashboard = () => {
  const theme = useTheme();





 




  const chartData = [
    {
      name: "Eggs Produced",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "Chickens Sold",
      data: [20, 35, 40, 55, 65, 75, 85, 100],
    },
  ];
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const DASHBOARDDATAQUERY = gql`
    query DashboardDataQuery {
      getDashboardData {
    totalProfit
      totalOrdersAmount
      totalChicken
      totalChickenSold
      mortalityRate
      totalEggsCollected
      totalEggsSold
      damageRate
      eggsProducedPerMonth {
        total
        month
      }
      chickenSoldPerMonth {
        total 
        month
      }
      customerOrders {
        customerName
        customerEmail
        totalAmount

        items {
            productName
            productId
            quantity
            price
        }
      }    
    
      }
}


  `
  const { data, error, loading } = useQuery(DASHBOARDDATAQUERY);

  // if(loading) return <Typography>Loading.........</Typography>
  console.log('error', error)
  if (error) return <Typography>{'error'}</Typography>

  const totalProfit = data?.getDashboardData?.totalProfit ?? 'N/A';
  const totalOrdersAmount = data?.getDashboardData?.totalOrdersAmount ?? 'N/A';
  const totalChicken = data?.getDashboardData?.totalChicken ?? 'N/A';
  const totalChickenSold = data?.getDashboardData?.totalChickenSold ?? 'N/A';
  const mortalityRate = data?.getDashboardData?.mortalityRate ?? 'N/A';
  const totalEggsCollected = data?.getDashboardData?.totalEggsCollected ?? 'N/A';
  const totalEggsSold = data?.getDashboardData?.totalEggsSold ?? 'N/A';
  const damageRate = data?.getDashboardData?.damageRate ?? 'N/A';
  const customerOrders = data?.getDashboardData?.customerOrders ?? 'N/A';+

  console.log(typeof mortalityRate); // Should be "number"
  const chickenReport = [
    { label: "Total Chickens", value: totalChicken },
    { label: "Total Sold", value: totalChickenSold },
    { label: "Mortality Rate", value: parseFloat(mortalityRate).toFixed(2) },
  ];

  const eggsReport = [
    { label: "Eggs Collected", value: totalEggsCollected },
    { label: "Total Sold", value: totalEggsSold },
    { label: "Damage Rate", value: parseFloat(damageRate).toFixed(2) },
  ];

  // const orders = [
  //   { id: 1, customer: "John Doe", item: "Wireless Headphones", price: "$120" },
  //   { id: 2, customer: "Jane Smith", item: "Smartphone", price: "$850" },
  //   { id: 3, customer: "Alice Johnson", item: "Gaming Laptop", price: "$1,500" },
  //   { id: 4, customer: "Mark Brown", item: "Bluetooth Speaker", price: "$95" },
  // ];
  // console.log('data', data);



  const orders = data ? customerOrders?.map((order, index) => {
    return {id: `${order.customerEmail}-${index}`, customer: order.customerName, item: order.items.map(item => item.price), price: order.totalAmount}
  }) : []
  
  console.log(data)

  return (

    <Box marginTop={3} width={"100%"} paddingBottom={30}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 10 }} width={"100%"}>
        <Grid container size={{ xs: 12, md: 12, lg: 8, }}>
          <Grid size={{ xs: 12, md: 6, lg: 6, }} >
            <StatBox loading={loading} title={(totalProfit || 'N/A')} subTitle={'Total Profit'} bottomText={"Yearly Return"} icon={<FaDollarSign />} iconText={<Box width={10} height={10} borderRadius={'50%'} bgcolor={theme.palette.secondary.main}></Box>} statBoxIconBgColor={theme.palette.secondary.main} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, }}>
            <StatBox loading={loading} title={totalOrdersAmount} subTitle={'Total Orders'} bottomText={"Pending"} icon={<ShoppingCartIcon />} iconText={<Box width={10} height={10} borderRadius={'50%'} bgcolor={theme.palette.primary.main}></Box>} statBoxIconBgColor={theme.palette.primary.main} />
          </Grid>
          <Grid size={12}>
            <PoultryReportCard loading = {loading} icon={<GiChicken size={30} style={{ marginRight: "16px", color: theme.palette.primary.main }} />} data={chickenReport} color={theme.palette.primary.main}  />
          </Grid>
          <Grid size={12}>
            <PoultryReportCard icon={<EggIcon sx={{ fontSize: 40, marginRight: "16px", color: theme.palette.secondary.main }} />} data={eggsReport} color={theme.palette.secondary.main} />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 4, }} sx={{
          marginTop: {
            sm: "20px", lg: 0
          }
        }} bgcolor={theme.palette.background.paper} paddingBottom={3} position={'relative'}>
          <OrderCard orders={loading ? [] : orders} />
        </Grid>

      </Grid>
      <Grid container marginTop={7}>
        <Grid size={12}>
          <LineChart title="Poultry Production Analysis" chartData={chartData} categories={categories} />
        </Grid>
      </Grid>
    </Box>
  )
}
