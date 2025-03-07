import { Card,Box, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@emotion/react";
import {CircularProgress} from "@mui/material";


export const PoultryReportCard = ({ icon, data, color, loading}) => {
    const theme = useTheme();
  return (
    <Card sx={{ display: "flex", alignItems: "center", padding: "16px", borderRadius: "12px", background: theme.palette.background.paper, boxShadow: "none" }}>
      {/* Left Section - Dynamic Icon */}
      {icon}

      {/* Right Section - Report Data */}
      <CardContent sx={{ flex: 1, padding: "0" }}>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item size={{xs: 6, sm: 4}} key={index} >
              <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
              <Box>{loading ? <CircularProgress size={24}/> : <Typography variant="h6" fontWeight="bold">{item.value}</Typography>}</Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

