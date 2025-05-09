import React, {useCallback} from 'react';
import {Box, Typography, InputLabel, MenuItem, FormControl, Select, Button} from '@mui/material';


export const InputField = ({input, value, name, label, setInput, fieldName, dropdownItems = []}) => {
        console.log(dropdownItems)
        const handleSetInput = useCallback(function (e) {
          const { name, value } = e.target
          console.log(name, value)
          setInput((prevInputs) => {
            return setInput({ ...prevInputs, [name]: value })
          })
        }, [])
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
