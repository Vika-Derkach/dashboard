import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { StockChart } from "../../components";
import { stockAPI } from "../../services/StockServer";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StockPage = () => {
  const { data, error, isLoading, refetch } = stockAPI.useFetchAllStocksQuery();
  const [value, setValue] = useState(0);
  console.log(data && data["Monthly Adjusted Time Series"]);

  const monthlyDays = useMemo(
    () => data && Object.keys(data["Monthly Adjusted Time Series"]),
    [data]
  );
  const monthlyValues = useMemo(
    () => data && Object.values(data["Monthly Adjusted Time Series"]),
    [data]
  );

  const monthlyData = useMemo(
    () =>
      data &&
      monthlyDays.map((dayElem, dayI) => {
        return { days: dayElem, mounthValue: monthlyValues[dayI]["2. high"] };
      }),
    [data, monthlyDays, monthlyValues]
  );

  const limitedData = monthlyData?.slice(0, 20);
  console.log(limitedData);

  console.log(monthlyDays);
  console.log(monthlyValues);
  console.log(monthlyData, "monthlyData");

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
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {!isLoading && limitedData && (
          <>
            <StockChart value={value} index={0} data={limitedData} />
            <StockChart value={value} index={1} data={limitedData} />
            <StockChart value={value} index={2} data={limitedData} />
            <StockChart value={value} index={3} data={limitedData} />
          </>
        )}
      </Box>
    </Container>
  );
};

export { StockPage };
