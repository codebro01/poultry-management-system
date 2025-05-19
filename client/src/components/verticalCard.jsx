import React from 'react'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Divider, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Card, CardContent } from '@mui/material';
import { useTheme } from '@emotion/react';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export const OrderCard = ({ orders }) => {
  const theme = useTheme()
  return (
    <>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70px',
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
        }}
        bgcolor={theme.palette.primary.main}
      >
        <Typography variant="h6">Customer's Orders</Typography>
      </Box>

      {/* List of Orders */}
      <Box sx={{ maxHeight: '380px', overflowY: 'auto', padding: '16px' }}>
        <List>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{ marginBottom: '12px', borderRadius: '12px', boxShadow: 0 }}
            >
              <CardContent
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <ShoppingCartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={order.item}
                  secondary={`${order.customer} • ${order.price}`}
                  // primaryTypographyProps={{ fontWeight: "bold" }}
                  // secondaryTypographyProps={{ color: "text.secondary", fontSize: "14px" }}
                />
              </CardContent>
              <Divider variant="inset" component="li" />
            </Card>
          ))}
        </List>
      </Box>

      {/* "See All" Link */}
      <Typography
        fontSize={12}
        color={theme.palette.text.darkGrey}
        position={'absolute'}
        bottom={'10px'}
        right={'10px'}
        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        See All
      </Typography>
    </>
  )
}
