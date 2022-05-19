import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { forwardRef, useState } from "react";

const GenderSelect = forwardRef(({ control, ...props }, ref) => {
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  console.log(gender, "gender");
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
          ref={ref}
          control={control}
        >
          <MenuItem value="1">Female</MenuItem>
          <MenuItem value="2">Male</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});

export { GenderSelect };
