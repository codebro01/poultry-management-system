import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  } from "@mui/material";
import Chart from "react-apexcharts";
import Grid from "@mui/material/Grid2"
import { useTheme } from "@emotion/react";



export const SalesReportComponent  = ({salesData, chartSeriesName, totalSoldTitle, totalRevenTitle}) => {
    const theme = useTheme();

    
      
      const totalItemSold = salesData.reduce((acc, data) => acc + data.chickensSold, 0);
      const totalRevenue = salesData.reduce((acc, data) => acc + data.revenue, 0);
      
      const chartOptions = {
        chart: {
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 8, // Makes the top of the bars curved
            horizontal: false,
            columnWidth: "50%",
          },
        },
        xaxis: {
          categories: salesData.map((data) => data.month),
        },
        colors: [theme.palette.primary.main],
      };
      
      const chartSeries = [
        {
          name: {chartSeriesName},
          data: salesData.map((data) => data.chickensSold),
        },
      ];



  return (
    <Grid className = {'paddingBottom'} container spacing={3} sx={{ mt: 3 }}>
      {/* Summary Cards */}
      <Grid size = {{xs: 12, sm: 6}}>
        <Card sx={{ backgroundColor: theme.palette.secondary.main, p: 2 }}>
          <CardContent sx= {{
            cursor: 'pointer', 
            transition: "0.3s",
            "&:hover": {
                transform: "translateY(-10px)"
            }
          }}>
            <Typography variant="h6" fontWeight="bold" color= {theme.palette.text.white}>{totalSoldTitle}</Typography>
            <Typography color= {theme.palette.text.white} variant="h4">{totalItemSold}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size = {{xs: 12, sm: 6}}>
        <Card sx={{ backgroundColor: theme.palette.secondary.main, p: 2 }}>
          <CardContent
          sx= {{
            cursor: 'pointer', 
            transition: "0.3s",
            "&:hover": {
                transform: "translateY(-10px)"
            }
          }}
          >
            <Typography variant="h6" fontWeight="bold" color= {theme.palette.text.white}>{totalRevenTitle}</Typography>
            <Typography variant="h4" color= {theme.palette.text.white}>${totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Chart */}
      <Grid size = {12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold"  gutterBottom>
              Monthly Sales Chart
            </Typography>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={250} />
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Table */}
      <Grid size = {12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Detailed Sales Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Month</strong></TableCell>
                    <TableCell><strong>Chickens Sold</strong></TableCell>
                    <TableCell><strong>Revenue ($)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.chickensSold}</TableCell>
                      <TableCell>${row.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

