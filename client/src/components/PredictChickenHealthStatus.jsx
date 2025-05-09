import React, {useState, useCallback} from 'react';
import {Box,Paper, Typography, InputLabel, MenuItem, FormControl, Select, Button} from '@mui/material';
import { InputField } from './inputField';
import { useTheme } from '@mui/material';

export const PredictChickenHealthStatus = ({setPredictForm}) => {
  const theme = useTheme();
    const [input, setInput] = useState({
        temperature: '', 
        appetiteLevel: '', 
        featherCondition: '', 
        combColor: '', 
        respiratoryRate: '', 
        ageInWeeks: '', 
        activityLevel: '', 
        heartRate: '', 

    })

    const handlePredictSubmit = async function (e) {
      e.preventDefault();
    }

    const menuOptions = [
      {name:'ten', value: 10}, 
      {name:'twenty', value: 20}, 
      {name:'thirty', value: 30}, 
    
    ]
      
      
  return (
    <Paper component={'paper'} elevation={6}>
      <Box
        component={'form'}
        onSubmit={(e) => handlePredictSubmit(e)}
        sx={{
          position: 'fixed',
          right: '5%',
          bottom: '5%',
          maxHeight: '500px',
          height: 'auto',
          width: '300px',
          background: theme.palette.background.default,
          padding: '10px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          overflowY: 'scroll',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{
            fontSize: '16px !important',
          }}
        >
          Predict Chicken Health Status
        </Typography>

        <Box>
          <InputField
            input={input}
            value={input && input.temperature}
            name={'temperature'}
            label={'temperature'}
            setInput={setInput}
            fieldName={'Temperature'}
            dropdownItems={menuOptions}
          />
        </Box>
        <Box>
          <InputField
            input={input}
            value={input && input.appetiteLevel}
            name={'appetiteLevel'}
            label={'appetiteLevel'}
            setInput={setInput}
            fieldName={'Appetite Level'}
            dropdownItems={menuOptions}
          />
        </Box>
        <Box>
          <InputField
            input={input}
            value={input && input.appetiteLevel}
            name={'appetiteLevel'}
            label={'appetiteLevel'}
            setInput={setInput}
            fieldName={'Appetite Level'}
            dropdownItems={menuOptions}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            background: theme.palette.secondary.main,
            color: theme.palette.text.white,
            marginTop: 'auto',
          }}
        >
          Predict
        </Button>
        <Button
          onClick={() => setPredictForm(false)}
          sx={{
            background: theme.palette.error.main,

            color: theme.palette.text.white,
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  )
}


// "temperature": 42,
// "": 350,
// "": 8,
// "": 7,
// "": "smooth",
// "": "bluish",
// "": 70,
// "": 10
