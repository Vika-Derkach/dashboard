import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const GenderSelect = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("gender")}
        >
          <MenuItem value="1">Female</MenuItem>
          <MenuItem value="2">Male</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export { GenderSelect };
