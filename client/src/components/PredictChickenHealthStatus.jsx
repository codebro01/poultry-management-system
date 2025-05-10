import React, {useState} from 'react';
import {Box,Paper, Typography, InputLabel, MenuItem, FormControl, Select, Button} from '@mui/material';
import { SelectField, InputField } from './inputField';
import { useTheme } from '@mui/material';
import { Axios } from 'axios';

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

    const appetiteLevelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      featherConditionOptions = ['smooth', 'ruffled'],
      combColorOptions = ['bright red', 'pale', 'bluish'], 
      heartRateOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], 
      respiratoryRateOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 
      activityLevelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  

    const handlePredictSubmit = async function (e) {
      e.preventDefault();
      const response = await axios.post(`${}`)
    }

    const formattedInput = () => {
    if(input) {
      const { temperature, ageInWeeks } = input

      return {
        ...input,
        temperature: Number(temperature),
        ageInWeeks: Number(ageInWeeks),
      }
    }
    }
 
    console.log(formattedInput())
      
      
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
            value={input && Number(input.temperature)}
            name={'temperature'}
            label={'temperature'}
            setInput={setInput}
            type={'number'}
            textField={'Temperature'}
          />
        </Box>

        <Box>
          <SelectField
            input={input}
            value={input && input.featherCondition}
            name={'featherCondition'}
            label={'featherCondition'}
            setInput={setInput}
            fieldName={'Feather Condition'}
            dropdownItems={featherConditionOptions}
          />
        </Box>
        <Box>
          <SelectField
            input={input}
            value={input && input.appetiteLevel}
            name={'appetiteLevel'}
            label={'appetiteLevel'}
            setInput={setInput}
            fieldName={'Appetite Level'}
            dropdownItems={appetiteLevelOptions}
          />
        </Box>
        <Box>
          <SelectField
            input={input}
            value={input && input.combColor}
            name={'combColor'}
            label={'combColor'}
            setInput={setInput}
            fieldName={'Comb Color'}
            dropdownItems={combColorOptions}
          />
        </Box>
        <Box>
          <SelectField
            input={input}
            value={input && input.respiratoryRate}
            name={'respiratoryRate'}
            label={'respiratoryRate'}
            setInput={setInput}
            fieldName={'Respiratory Rate'}
            dropdownItems={respiratoryRateOptions}
          />
        </Box>
        <Box>
          <SelectField
            input={input}
            value={input && input.heartRate}
            name={'heartRate'}
            label={'heartRate'}
            setInput={setInput}
            fieldName={'Heart Rate'}
            dropdownItems={heartRateOptions}
          />
        </Box>
        <Box>
          <SelectField
            input={input}
            value={input && input.activityLevel}
            name={'activityLevel'}
            label={'activityLevel'}
            setInput={setInput}
            fieldName={'Activity Level'}
            dropdownItems={activityLevelOptions}
          />
        </Box>
        <Box>
          <InputField
            input={input}
            value={input && input.ageInWeeks}
            name={'ageInWeeks'}
            label={'ageInWeeks'}
            setInput={setInput}
            type={'number'}
            textField={'Age in Weeks'}
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
