import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import jsCookie from 'js-cookie';


export const LogoutButton = () => {
    const navigate = useNavigate()
    const handleLogout = () => {


        navigate('/admin/sign-in');
    }
  return (
    <Box display={"flex"} alignItems={"center"}>
            {/* <LogoutIcon/> */}
          <Button variant='contained' onClick={handleLogout}>Logout</Button>
    </Box>
  )
}
