import { useCart } from "../../context/cartContext";
import { Container, Typography, Paper, Box, IconButton, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { NairaIcon } from "../../components/NairaComponent";
import { useTheme } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";
import react, { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import React from "react";

export const CheckOutPage = () => {
  //   const { cart } = useCart();
  const cart = JSON.parse(localStorage.getItem('cart'));
  const formatNumber = (num) => num.toLocaleString("en-NG");
  const theme = useTheme();
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const API_publicKey = "FLWPUBK_TEST-548ec83b6909454bc7bbb3a930c51d8a-X";
  const [flutterwaveLoaded, setFlutterwaveLoaded] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the script is already added
    if (!document.querySelector("#flutterwave-script")) {
      const script = document.createElement("script");
      script.id = "flutterwave-script";
      script.src = "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js";
      script.async = true;
      script.onload = () => {
        console.log("Flutterwave script loaded");
        setFlutterwaveLoaded(true);
      };
      script.onerror = () => console.error("Failed to load Flutterwave script");
      document.body.appendChild(script);
    } else {
      setFlutterwaveLoaded(true);
    }
  }, []);

  function payWithRave() {
    if (!flutterwaveLoaded) {
      console.error("Flutterwave script not loaded");
      return;
    }

    const x = window.getpaidSetup({
      PBFPubKey: API_publicKey,
      customer_email: userData?.email,
      amount: totalAmount,
      customer_phone: "234099940409",
      currency: "NGN",
      txref: "rave-123456",
      meta: [
        {
          metaname: "flightID",
          metavalue: "AP1234",
        },
      ],
      onclose: function () {
        console.log("Payment closed");
      },
      callback: function (response) {
        console.log("Payment response:", response);
        if (
          response.data.chargeResponseCode === "00" ||
          response.data.chargeResponseCode === "0"
        ) {
          alert("Payment successful!");
        } else {
          alert("Payment failed!");
        }
        x.close();
      },
    });
  }


  const checkCookie = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-cookie`, { withCredentials: true });
      setUserData(response.data.userData);

      if(response.data.message == "cookie present") {
        payWithRave();
        return;
      } else {
        navigate('/sign-in')
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }


  useEffect(() => {
    setTotalAmount(cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0))
  }, [cart])






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
        <Box>
          <Typography textAlign={"center"} sx={{
            textDecoration: "underline"
          }}>Checkout page</Typography>
          {cart.length < 1 ? (<Typography textAlign={"center"} mt={4}>Cart is Empty</Typography>) : (
            <Grid
              container
              rowGap={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cart.map((item) => (
                <>
                  <Grid
                    size={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: "5px",
                        sm: "10px",
                      },
                    }}
                  >
                    <Box
                      component={"img"}
                      src={item.productImage}
                      alt={item.productName}
                      sx={{
                        width: { xs: 50, sm: 80, },
                        height: { xs: 50, sm: 80, },
                        borderRadius: "3px",
                      }}
                    ></Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {
                          xs: 12,
                          sm: 14,
                        },
                      }}
                    >
                      {item.productName}
                    </Typography>
                  </Grid>
                  <Grid
                    size={3}
                    sx={{
                      display: "flex",
                      gap: {
                        xs: 0.5,
                        sm: 1,
                        md: 2,
                      },
                      alignItems: "center",
                      pointerEvents: "auto"
                    }}
                  >
                    <IconButton

                      onClick={() => decrementQuantity(item.itemId)}

                      sx={{
                        background: theme.palette.secondary.main,

                        "&:hover": {
                          background: theme.palette.secondary.main,
                        },
                        width: { xs: 30, }, // Adjust width based on screen size
                        height: { xs: 30, },
                      }}
                    >
                      <RemoveRoundedIcon
                        sx={{
                          color: theme.palette.text.white,
                          fontSize: { xs: 18, sm: 24, md: 30 },
                        }}
                      />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton

                      onClick={() => incrementQuantity(item.itemId)}

                      sx={{
                        background: theme.palette.secondary.main,
                        "&:hover": {
                          background: theme.palette.secondary.main,
                        },
                        width: { xs: 30, }, // Adjust width based on screen size
                        height: { xs: 30, },

                      }}
                    >
                      <AddRoundedIcon
                        sx={{
                          color: theme.palette.text.white,
                          fontSize: { xs: 18, sm: 24, md: 30 },
                        }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid size={2}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 13,
                          sm: 16,
                        },
                      }}
                    >
                      <NairaIcon />
                      {formatNumber(item.productPrice * item.quantity)}
                    </Typography>
                  </Grid>
                  <Grid size={1}>
                    <IconButton

                      onClick={() => {
                        removeFromCart(item.itemId);
                      }}
                    >
                      <CloseRoundedIcon
                        sx={{ color: theme.palette.error.main }}
                      />
                    </IconButton>
                  </Grid>
                </>
              ))}
            </Grid>
          )}
          <Paper
            elevation={2}
            sx={{
              mt: 5,
              padding: 5,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 16,
                },
              }}
            >
              Total: <NairaIcon /> {formatNumber(cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0))}
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={5}
              bgcolor={theme.palette.text.darkGrey}
              p={1}
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 16,
                },
                cursor: "pointer",
              }}
            >
              <Button onClick={checkCookie}>Continue to payment</Button>
              <ArrowForwardRoundedIcon
                sx={{ color: theme.palette.secondary.main }}
              />{" "}
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};
