import React, { useCallback } from 'react'
import {
  Box,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@mui/material'

export const SelectField = ({
  input,
  value,
  name,
  label,
  setInput,
  fieldName,
  dropdownItems = [],
}) => {
  const handleSetInput = (e) => {
    const { name, value } = e.target
    setInput((prevInputs) => ({ ...prevInputs, [name]: value }))
    }

    return (
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            top: '-6px', // adjust as needed
            fontSize: '0.875rem',
            
          }}
        >
          {fieldName}
        </InputLabel>
        <Select
          name={name}
          labelId={`Chicken ${name}`}
          id={name}
          value={input && value}
          label={label}
          required
          onChange={(e) => handleSetInput(e)}
          sx={{
            height: 40,
          }}
        >
          {dropdownItems &&
            dropdownItems.map((item, index) => {
              if (Array.isArray(dropdownItems)) {
                return (
                  <MenuItem key={index++} value={item?.value || item}>
                    {item?.name || item}
                  </MenuItem>
                )
              }
            })}
        </Select>
      </FormControl>
    )
  }


export const InputField = ({
  input,
  value,
  name,
  label,
  setInput,
  fieldName,
  type,
  
}) => {
  const handleSetInput = (e) => {
    const { name, value } = e.target
    setInput((prevInputs) => ({ ...prevInputs, [name]: value }))
  }
    

  return (
    <TextField
      fullWidth
      name={name}
      value={input && Number(value)}
      id={name}
      label={label}
      type={type}
      placeholder={fieldName}
      required
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      onChange={(e) => handleSetInput(e)}
      sx={{
        '& .MuiInputBase-root': {
          height: 40, // sets the overall container height
        },
        '& input': {
          padding: '10px 14px', // optional: reduce vertical padding
        },
      }}
    />
  )
}
