import React, {useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

export const RobotIcon = ({setPredictForm, predictForm}) => {
    const location = useLocation();

    // ! check if on on signin page to display prediction robot, if yes, hides it. 
        const onSignInPage = useCallback(() => 
            location.pathname === '/admin/sign-in'
        , [location.pathname])
  return ( 
    <>
       {!onSignInPage() && (
        <Box
                          onClick={() => setPredictForm(!predictForm)}
                          component="img"
                          src="/Robot.png"
                          alt="Robot.png"
                          sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '50%',
                            padding: '10px',
                          }}
                        />
       )}
    </>
  )
}
