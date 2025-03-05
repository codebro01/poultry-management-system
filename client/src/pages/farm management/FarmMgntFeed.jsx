import React from "react";
import {  Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PoultryFeedCard } from "../../components/PoultryFeedCard";

const poultryFeeds = [
  {
    id: 1,
    name: "Starter Feed",
    type: "Pellet",
    weight: 25,
    price: 30,
    stock: 50,
    description: "High-protein feed for young chicks.",
    image: "https://via.placeholder.com/300",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Layer Mash",
    type: "Mash",
    weight: 50,
    price: 45,
    stock: 20,
    description: "Essential nutrients for laying hens.",
    image: "https://via.placeholder.com/300",
    isAvailable: false,
  },
  {
    id: 3,
    name: "Grower Feed",
    type: "Crumbles",
    weight: 25,
    price: 35,
    stock: 30,
    description: "Balanced nutrition for pullets and broilers.",
    image: "https://via.placeholder.com/300",
    isAvailable: true,
  },
];

export const PoultryFeedList = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {poultryFeeds.map((feed) => (
          <Grid item xs={12} sm={6} md={4} key={feed.id}>
            <PoultryFeedCard feed={feed} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

