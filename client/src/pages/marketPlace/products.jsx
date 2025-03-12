import React, { useEffect, createContext } from "react";
import { NavbarComponent } from "../../components/navbarComponent";
import { ResponsiveAppBar } from "../../components/AppBar";
import { Container, Box, Typography, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import { ProductsCard } from "../../components/productsCard";
import Grid from "@mui/material/Grid2";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "../../context/cartContext";

import { useState } from "react";

export const ProductsPage = () => {
  const theme = useTheme();
  const [allBirds, setAllBirds] = useState([]);
  const [allEggs, setAllEggs] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const {cart} = useCart();

      useEffect(() =>{
        console.log(cart)
      }, [cart])

  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const BIRDSQUERY = gql`
    query GetBirds {
      poultryBirds {
        id
        name
        price
        description
        images
      }
    }
  `;
  const EGGSQUERY = gql`
    query EggsQuery {
      poultryEggs {
        types
        id
        images
        pricePerTray
      }
    }
  `;

  const {
    data: birdsData,
    error: birdsError,
    loading: birdsLoading,
  } = useQuery(BIRDSQUERY);
  const {
    data: eggsData,
    error: eggsError,
    loading: eggsLoading,
  } = useQuery(EGGSQUERY);

  if (eggsData) console.log(eggsData);

  useEffect(() => {
    if (birdsData) {
      setAllBirds(birdsData.poultryBirds);
    }
  }, [birdsData]);

  useEffect(() => {
    if (eggsData) {
      setAllEggs(eggsData.poultryEggs);
    }
  }, [eggsData]);

  // const addToCart = (item) => {
  //   // Ensure cartArray is always an array
  //   let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
  
  //   // If cartArray is not an array (e.g., stored value was not an array), reset it
  //   if (!Array.isArray(cartArray)) {
  //     cartArray = [];
  //   }
  
  //   // Add the new item
  //   cartArray.push(item);
  
  //   // Save back to localStorage
  //   setCartItems(cartArray);
  //   localStorage.setItem('cart', JSON.stringify(cartArray));
  
  //   console.log(cartArray);
  // };

  // const cartItemsContext = createContext();


  

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          xs: 0,
          sm: "10px",
        },
      }}
    >
      <Paper
        sx={{
          width: "95%",
          minHeight: "100vh",
          background: "#ffffff",
          borderRadius: 0,
          padding: {
            xs: "100px 10px",
            sm: "100px 50px",
          },
        }}
        elevation={2}
      >
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Box>
            <Typography
              textAlign={"center"}
              fontWeight={700}
              bgcolor={theme.palette.secondary.main}
              padding={"10px"}
              color={theme.palette.text.white}
              borderRadius={"1px"}
            >
              Buy Chickens
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            columnGap={birdsLoading ? 1 : 0}
            rowGap={birdsLoading ? 1 : 0}
            direction={"row"}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {birdsLoading
              ? skeletonArray.map((item) => (
                  <Grid key={item} size={{ xs: 5, md: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      animation="pulse"
                      height={150}
                      // width={"100%"}
                      sx={{
                        maxWidth: {
                          xs: 150,
                          sm: 270,
                        },
                      }}
                    />
                  </Grid>
                ))
              : allBirds.map((bird) => (
                  <Grid key={bird.id} size={{ xs: 6, md: 4 }}>
                    <ProductsCard
                      loading={birdsLoading}
                      productName={bird.name}
                      productPrice={bird.price}
                      productDescription={bird.description}
                      productImage={bird.images[0]}
                      itemId = {bird.id}
                    />
                  </Grid>
                ))}
          </Grid>
          <Box>
            <Typography
              textAlign={"center"}
              fontWeight={700}
              bgcolor={theme.palette.secondary.main}
              padding={"10px"}
              color={theme.palette.text.white}
              borderRadius={"1px"}
            >
              Buy Eggs
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            columnGap={birdsLoading ? 1 : 0}
            rowGap={birdsLoading ? 1 : 0}
            direction={"row"}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {eggsLoading
              ? skeletonArray.map((item) => (
                  <Grid key={item} size={{ xs: 5, md: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      animation="pulse"
                      height={150}
                      // width={"100%"}
                      sx={{
                        maxWidth: {
                          xs: 150,
                          sm: 270,
                        },
                      }}
                    />
                  </Grid>
                ))
              : allEggs.map((egg) => (
                  <Grid key={egg.id} size={{ xs: 6, md: 4 }}>
                    <ProductsCard
                      loading={eggsLoading}
                      productName={`${egg.types} Egg`}
                      productPrice={egg.pricePerTray}
                      productDescription={""}
                      productImage={egg.images[0]}
                      itemId ={egg.id}
                    />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
