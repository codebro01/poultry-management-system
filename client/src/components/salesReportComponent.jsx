import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import Chart from "react-apexcharts";
import Grid from "@mui/material/Grid2"
import { useTheme } from "@emotion/react";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export const SalesReportComponent = ({ salesData, chartSeriesName, totalSoldTitle, totalRevenTitle, totalItemSold, totalRevenue,chickensSoldForEachMonth}) => {
  const theme = useTheme();

  const month = [
    { name: "Jan", value: 1 },
    { name: "Feb", value: 2 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 4 },
    { name: "May", value: 5 },
    { name: "Jun", value: 6 },
    { name: "Jul", value: 7 },
    { name: "Aug", value: 8 },
    { name: "Sep", value: 9 },
    { name: "Oct", value: 10 },
    { name: "Nov", value: 11 },
    { name: "Dec", value: 12 }
  ];
  


  const totalItemSoldAcc = salesData.reduce((acc, data) => acc + data.totalBirdsSold, 0) || salesData.reduce((acc, data) => acc + data.totalEggsSold, 0);
  const totalRevenueAcc = salesData.reduce((acc, data) => acc + data.totalProfit, 0);

  console.log('shales DATA', totalItemSoldAcc)


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
      categories: salesData.map((data) => data?.month),
    },
    colors: [theme.palette.primary.main],
  };

  const chartSeries = [
    {
      name: { chartSeriesName },
      data: salesData.map((data) => data?.totalBirdsSold || data?.totalEggsSold),
    },
  ];


  const formatNumber = (num) => num.toLocaleString("en-NG");

  return (
    <Grid className={'paddingBottom'} container spacing={3} sx={{ mt: 3 }}>
      {/* Summary Cards */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card sx={{ backgroundColor: theme.palette.secondary.main, p: 2 }}>
          <CardContent sx={{
            cursor: 'pointer',
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-10px)"
            }
          }}>
            <Typography variant="h6" fontWeight="bold" color={theme.palette.text.white}>{totalSoldTitle}</Typography>
            <Typography color={theme.palette.text.white} variant="h4">{formatNumber(totalItemSoldAcc)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card sx={{ backgroundColor: theme.palette.secondary.main, p: 2 }}>
          <CardContent
            sx={{
              cursor: 'pointer',
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-10px)"
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold" color={theme.palette.text.white}>{totalRevenTitle}</Typography>
            <Typography variant="h4" color={theme.palette.text.white}>{<FontAwesomeIcon icon={faNairaSign} />
            }{formatNumber(totalRevenueAcc)}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Chart */}
      <Grid size={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Monthly Sales Chart
            </Typography>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={250} />
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Table */}
      <Grid size={12} xs={12}>
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
                  {salesData.map((row, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>  {month.find(mon => mon.value === parseInt(row.month.split('-')[1]))?.name || "Unknown"}</TableCell>
                      <TableCell>{formatNumber(row.totalBirdsSold || row.totalEggsSold)}</TableCell>
                      <TableCell><FontAwesomeIcon icon={faNairaSign} /> 
                      {formatNumber(row.totalProfit)}</TableCell>
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

