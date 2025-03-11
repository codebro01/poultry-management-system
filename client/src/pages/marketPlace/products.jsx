import React from 'react';
import { NavbarComponent } from '../../components/navbarComponent';
import { ResponsiveAppBar } from '../../components/AppBar';
import { Container, Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import { ProductsCard } from '../../components/productsCard';
import Grid from "@mui/material/Grid2"
export const ProductsPage = () => {
  const theme = useTheme();
  return (
    <Container sx = {{display: "flex", justifyContent:"center", alignItems: "center", }}>
      <Paper sx={{
        width: "95%",
        minHeight: "100vh",
        background: "#ffffff",
        borderRadius: 0,
        padding: {
          xs: "100px 10px", 
          sm: "100px 50px",
        },
      }} elevation={2}>
        <Box display={"flex"} flexDirection={"column"} gap = {5}>
            <Box display={"flex"} justifyContent={"center"} >
            <Typography textAlign={ "center"} fontWeight={700} bgcolor={theme.palette.secondary.main} padding={"10px"} color = {theme.palette.text.white} borderRadius={"1px"}>Buy Chickens</Typography>
            </Box>
            <Grid>
              <ProductsCard/>
            </Grid>
        </Box>
        <Box>
          <Typography textAlign={ "center"}>Buy Eggs</Typography>
        </Box>
      </Paper>
    </Container>
  )
}
