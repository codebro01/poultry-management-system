import React from 'react';
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
import { FaDrumstickBite } from 'react-icons/fa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GiChicken } from 'react-icons/gi';



export const Dashboard = () => {
  const theme = useTheme();

  const chickenReport = [
    { label: "Total Chickens", value: "1,250" },
    { label: "Total Sold", value: "3,540" },
    { label: "Mortality Rate", value: "2.5%" },
  ];

  const eggsReport = [
    { label: "Eggs Collected", value: "3,540" },
    { label: "Total Sold", value: "1,250" },
    { label: "Damage Rate", value: "2.5%" },
  ];

  const orders = [
    { id: 1, customer: "John Doe", item: "Wireless Headphones", price: "$120" },
    { id: 2, customer: "Jane Smith", item: "Smartphone", price: "$850" },
    { id: 3, customer: "Alice Johnson", item: "Gaming Laptop", price: "$1,500" },
    { id: 4, customer: "Mark Brown", item: "Bluetooth Speaker", price: "$95" },
  ];


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

  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
  return (

    <Box marginTop={3} width={"100%"} paddingBottom={30}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 10 }} width={"100%"}>
        <Grid container size={{xs: 12, md: 12, lg: 8, }}>
          <Grid size={{xs: 12, md: 6,  lg: 6, }} >
            <StatBox title={20000} subTitle={'Total Profit'} bottomText={"Yearly Return"} icon={<FaDrumstickBite />} iconText={'+20%'} statBoxIconBgColor={theme.palette.primary.main} />
          </Grid>
          <Grid size={{xs:12, md: 6, lg: 6, }}>
            <StatBox title={20000} subTitle={'Total Orders'} bottomText={"Yearly Return"} icon={<MonetizationOnIcon />} iconText={'+20%'} statBoxIconBgColor={theme.palette.secondary.main} />
          </Grid>
          <Grid size={12}>
           <PoultryReportCard icon={<GiChicken size={30} style={{marginRight: "16px", color:theme.palette.primary.main}}/>} data={chickenReport} color={theme.palette.primary.main}/>
          </Grid>
          <Grid size={12}>
          <PoultryReportCard icon={<EggIcon sx={{ fontSize: 40, marginRight: "16px", color: theme.palette.secondary.main }}/>} data={eggsReport} color={theme.palette.secondary.main} />
          </Grid>
        </Grid>
        <Grid size={{xs: 12, md: 12, lg: 4, }} sx={{marginTop: {
          sm: "20px", lg: 0
        }}} bgcolor={theme.palette.background.paper}  paddingBottom={3} position={'relative'}>
            <OrderCard orders={orders}/>
        </Grid>

      </Grid>
      <Grid container marginTop={7}>
          <Grid size = {12}>
          <LineChart title="Poultry Production Analysis" chartData={chartData} categories={categories} />
          </Grid>
      </Grid>
    </Box>
  )
}
