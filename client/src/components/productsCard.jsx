import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Button, Box, Skeleton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@emotion/react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { NairaIcon } from "./NairaComponent";

export function ProductsCard({
  loading,
  productName,
  productPrice,
  productImage,
  productDescription,
  productCategory,
}) {
  const theme = useTheme();
  // console.log("Rendering ProductsCard", new Error().stack);
  const formatNumber = (num) => num.toLocaleString("en-NG");

  return (
    <>
      {loading ? (
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={30}
          />
          {/* <Skeleton variant="rectangular" width={"100%"} height={20} />
                            <Skeleton variant="rectangular" width={"100%"} height={20} /> */}
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: {
              xs: 150,
              sm: 270,
            },
            mb: 5
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={productImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {productName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {productDescription}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 3,
                }}
              >
                <Typography
                  sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                >
                  <NairaIcon />
                  {formatNumber(productPrice)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: theme.palette.secondary.main,
                    color: theme.palette.text.white,
                  }}
                  endIcon={<AddShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
