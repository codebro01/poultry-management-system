import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";

export const PoultryFeedCard = ({ feed }) => {
  return (
    <Card sx={{width: {
      xs: '250px', 
      sm: "300px", 
      md: "350"
    }, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={feed.images[0]}
        alt={feed.name}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {feed.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {feed.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {feed.weight} kg
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: <FontAwesomeIcon icon={faNairaSign} />{feed.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {feed.stock} bags
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {feed.description}
        </Typography>
        <Chip
          label={feed.isAvailable ? "Available" : "Out of Stock"}
          color={feed.isAvailable ? "success" : "error"}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

