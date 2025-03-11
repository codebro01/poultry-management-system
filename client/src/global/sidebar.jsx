import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { GiChicken, GiNestBirds, GiWheat } from "react-icons/gi"; // Game Icons
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // >
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useState } from 'react'
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const SidebarComponent = ({ handleSidebarToggle, isCollasped }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const authPage = location.pathname === '/admin/sign-in';
    return (
        <Box marginTop={3} sx={{
            height: "100%",
            position: "fixed",
            left: 0,
            top: "56px",
            backgroundColor: theme.palette.background.paper,
            display: authPage ? 'none' : null, 
            zIndex: 99999999

        }} >
            <Box
                onClick={() => handleSidebarToggle()}
                sx={{ textAlign: "right", display: "flex", justifyContent: "center", position: "relative" }}
            >
                <Box bgcolor={theme.palette.primary.main} sx={{
                    cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 20, zIndex: 999, right: "-10px", borderRadius: "50%",
                    '& .MuiSvgIcon-root': {
                        width: "27px",
                        height: "27px",
                        color: theme.palette.text.white
                    }
                }} >
                    {isCollasped ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Box>
            </Box>

            <Sidebar
                collapsed={isCollasped}
                rootStyles={{
                    height: "calc(100vh - 80px)",
                    paddingTop: isCollasped ? "80px" : "60px",
                    backgroundColor: theme.palette.background.paper,
                    // [`.${sidebarClasses.container}`]: {
                    //     backgroundColor: theme.palette.background.paper,
                    // },
                }}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree

                            if (level === 0)
                                return {
                                    color: disabled ? '#f5d9ff' : theme.palette.text.primary,
                                    backgroundColor: active ? '#eecef9' : undefined,
                                    "& .MuiSvgIcon-root": { color: theme.palette.primary.main }, // Icon color
                                    marginBottom: "20px", // Add spacing between menu items,
                                    fontSize: "16px", // Increase font size
                                    ".ps-submenu-expand-icon": {
                                        fontSize: "10px",
                                        color: theme.palette.primary.main
                                    }

                                };
                        },
                    }}
                >
                    <MenuItem icon={<DashboardIcon />} component={<Link to={'/dashboard'} />
                    }> Dashboard </MenuItem>

                    <SubMenu label="Farm Management" icon={<AgricultureIcon />}>

                        <MenuItem icon={<GiChicken color={theme.palette.primary.main} />} component={<Link to={'dashboard/farm-management/bird'} />}> Birds </MenuItem>
                        <MenuItem icon={<GiNestBirds color={theme.palette.primary.main} />} component={<Link to={'/dashboard/farm-management/egg'} />}>  Eggs </MenuItem>
                        <MenuItem icon={<GiWheat color={theme.palette.primary.main} />} component={<Link to={'/dashboard/farm-management/feed'} />}> Feed </MenuItem>
                    </SubMenu>
                    <SubMenu label="Sales Report" icon={<PointOfSaleIcon />}>
                        <MenuItem icon={<GiChicken color={theme.palette.primary.main} />}
                            component={<Link to={'/dashboard/sales-report/bird'} />}
                        > Birds </MenuItem>
                        <MenuItem icon={<GiNestBirds color={theme.palette.primary.main} />}
                            component={<Link to={'/dashboard/sales-report/egg'} />}
                        >  Eggs </MenuItem>

                    </SubMenu>
                    <MenuItem
                        icon={<PeopleIcon />}
                        component={<Link to={'/dashboard/users'} />}
                    >
                        Users
                    </MenuItem>
                    <MenuItem
                        icon={<ShoppingCartIcon />}
                        component={<Link to={'/dashboard/orders'} />}
                    >
                        Orders
                    </MenuItem>
                    {/* <MenuItem>   {isSmallScreen ? "Small Screen" : "Large Screen"} </MenuItem> */}
                </Menu>
            </Sidebar>
        </Box>
    )
}
