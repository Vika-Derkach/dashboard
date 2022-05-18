import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { StockChart } from "../../components";

function a11yProps(index) {
  console.log(index);

  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StockPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4, height: 900 }}>
      <Typography variant="h5" component="div">
        StockPage
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Facebook" {...a11yProps(0)} />
            <Tab label="Netflix" {...a11yProps(1)} />
            <Tab label="Amazon" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <>
          {value === 0 && <StockChart value={value} index={0} symbol="FB" />}
          {value === 1 && <StockChart value={value} index={1} symbol="NFLX" />}

          {value === 2 && <StockChart value={value} index={2} symbol="AMZN" />}
        </>
      </Box>
    </Container>
  );
};

export { StockPage };
