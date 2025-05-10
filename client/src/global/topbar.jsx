import React from 'react'
import { Box, Typography, Avatar, Container } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton';

export const Topbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const authPage = location.pathname === '/admin/sign-in'

    return (
        <Container component={'paper'} maxWidth={false} sx={{ position: "fixed", top: 0, zIndex:9999999 , left: 0, right: 0, display: authPage ? 'none' : "flex", justifyContent: "space-between", padding: "10px", margin: 0, width: "100%", background: theme.palette.background['paper'], alignItems: "center" }}>
            <Box marginLeft={3} sx={{ textAlign: "center", p: 2, zIndex: 99999999 }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: theme.palette.primary.main, // Use primary theme color
                        fontWeight: 900, // Extra bold
                        letterSpacing: 2, // Space out letters
                        textTransform: "uppercase", // Uppercase for a strong look
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Soft shadow effect
                    }}
                >
                    wura ola poultry farm
                </Typography>
            </Box>

            <Box display={"flex"} alignItems={"center"}>
                <Avatar src='/avatar.jpg' alt='Avatar.jpg' sx={{ width: "60px", height: "60px" }}>WO</Avatar>
            </Box>
        </Container>
    )
}
