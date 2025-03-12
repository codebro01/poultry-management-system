import React, { useEffect } from "react";
import { NavbarComponent } from "../../components/navbarComponent";
import { ResponsiveAppBar } from "../../components/AppBar";
import { Container, Box, Typography, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import { ProductsCard } from "../../components/productsCard";
import Grid from "@mui/material/Grid2";
import { gql, useQuery } from "@apollo/client";

import { useState } from "react";

export const ProductsPage = () => {
  const theme = useTheme();
  const [allBirds, setAllBirds] = useState([]);
  const [allEggs, setAllEggs] = useState([]);

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

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          <Grid container>
            {allBirds.map((bird) => (
              <Grid key={bird.id} size={{ xs: 6, md: 4 }}>
                <ProductsCard
                  loading={birdsLoading}
                  productName={bird.name}
                  productPrice={bird.price}
                  productDescription={bird.description}
                  productImage={bird.images[0]}
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
              Buy Chickens
            </Typography>
          </Box>
          <Grid container>
            {allEggs.map((egg) =>
              eggsLoading ? (
                <Grid key={egg.id} size={{ xs: 6, md: 4 }}>
                  <ProductsCard
                    loading={eggsLoading}
                    productName={`${egg.types} Egg`}
                    productPrice={egg.pricePerTray}
                    productDescription={""}
                    productImage={egg.images[0]}
                  />
                </Grid>
              ) : (
                <Grid key={egg.id} size={{ xs: 6, md: 4 }}>
                  <ProductsCard
                    loading={eggsLoading}
                    productName={`${egg.types} Egg`}
                    productPrice={egg.pricePerTray}
                    productDescription={""}
                    productImage={egg.images[0]}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
