import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";

export const LineChart = ({ title, chartData = [], categories = [] }) => {
  const theme = useTheme(); // Adapt colors based on the theme
  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    stroke: { curve: "smooth", width: 3 },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 5 },
    xaxis: {
      categories,
      labels: { style: { colors: theme.palette.text.primary } },
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.primary } },
    },
    tooltip: { theme: theme.palette.mode },
  };

  return (
    <Card
      sx={{
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '2px 2px 5px 2px rgba(0,0,0,0.2)',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="line"
          height={300}
        />
      </CardContent>
    </Card>
  )
};

