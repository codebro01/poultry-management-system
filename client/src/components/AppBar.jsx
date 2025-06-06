import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ShoppingCart } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { theme } from '../../theme';
import { useCart } from '../context/cartContext';
import { Link } from 'react-router-dom';

const pages = ['Products'];
const settings = ['checkOut'];

export function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const authPage = location.pathname === '/sign-in';

  // const cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(cart)
  const { cart } = useCart();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const scrollContainer = document.getElementById('main-content')

    const handleScroll = () => {
      console.log('scrollTop:', scrollContainer.scrollTop)
      setScrolled(scrollContainer.scrollTop > 400)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  console.log(scrolled)

  return (
    <AppBar

    sx={{
        backgroundColor: 'transparent',
        position: 'fixed',
        display: authPage ? 'none' : 'flex',
        shadow: 0, 
      }}
      className={scrolled && 'bg-white'}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {/* <AdbIcon sx={{ display: { xs: display= "flex" justifyContent= {"space-around"}'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.text.white,
              textDecoration: 'none',
            }}
          >
            Wura Ola Poultry Farm
          </Typography> */}
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.primary.main, // Use primary theme color
              fontWeight: 900, // Extra bold
              letterSpacing: 2, // Space out letters
              textTransform: 'uppercase', // Uppercase for a strong look
              display: {
                xs: 'none',
                md: 'flex',
                width: '60%',
              },
            }}
          >
            wura ola poultry farm
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: 'flex',
                md: 'none',
                justifyContent: 'space-around',
              },
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={'/'}>
                    {' '}
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.primary.main, // Use primary theme color
              fontWeight: 900, // Extra bold
              letterSpacing: 2, // Space out letters
              textTransform: ' rgba(0, 0, 0, 0.3)', // Soft shadow effect
              display: {
                xs: 'flex',
                md: 'none',
                textAlign: 'center',
              },
            }}
          >
            wura ola poultry farm
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  background: theme.palette.primary.main,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Click to Checkout">
              <IconButton
                sx={{
                  position: 'relative',
                  p: 0,
                }}
                onClick={handleOpenUserMenu}
              >
                <Badge color="error">
                  <ShoppingCart sx={{ color: theme.palette.primary.main }} />
                </Badge>
                <Typography
                  sx={{
                    position: 'absolute',
                    // background: "red",
                    padding: '1px 5px',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: theme.palette.primary.main
                  }}
                >
                  {cart.length}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={'/checkout'}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {setting}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
