import { Button, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { stockAPI } from "../../services/StockServer";
import { ErrorIndicator } from "../ErrorIndicator/ErrorIndicator";
import { Spinner } from "../Spinner/Spinner";
import "./StockChart.css";

const StockChart = (props) => {
  const { children, value, index, symbol, ...other } = props;
  const [monthes, setMonthes] = useState(true);
  const [weeks, setWeeks] = useState(false);

  // let timeSeties;
  // if (monthes) {
  //   timeSeties = "TIME_SERIES_MONTHLY_ADJUSTED";
  // } else {
  //   timeSeties = "TIME_SERIES_WEEKLY_ADJUSTED";
  // }

  const { data, error, isLoading, refetch } = stockAPI.useFetchAllStocksQuery({
    symbolStoke: symbol,
    timeSeties: monthes
      ? "TIME_SERIES_MONTHLY_ADJUSTED"
      : "TIME_SERIES_WEEKLY_ADJUSTED",
  });

  console.log(data && data["Monthly Adjusted Time Series"]);
  // console.log(timeSeties);
  const monthlyDays = useMemo(
    () =>
      data &&
      (monthes
        ? Object.keys(data["Monthly Adjusted Time Series"])
        : Object.keys(data["Weekly Adjusted Time Series"])),
    [data, monthes]
  );

  console.log(monthlyDays, "monthlyDays");
  const monthlyValues = useMemo(
    () =>
      data &&
      (monthes
        ? Object.values(data["Monthly Adjusted Time Series"])
        : Object.values(data["Weekly Adjusted Time Series"])),
    [data, monthes]
  );
  console.log(monthlyValues, "monthlyValues");

  const monthlyData = useMemo(
    () =>
      data &&
      monthlyDays.map((dayElem, dayI) => {
        return {
          days: dayElem,
          mounthHigh: monthlyValues[dayI]["2. high"],
          mounthLow: monthlyValues[dayI]["3. low"],
        };
      }),
    [data, monthlyDays, monthlyValues]
  );

  const limitedData = monthlyData?.slice(0, 20).reverse();
  console.log(limitedData, "limitedData");

  // const handleWeeks = () => {
  //   setMonthes(false);
  //   setWeeks(true);
  // };

  // const handleMonthes = () => {
  //   setWeeks(false);
  //   setMonthes(true);
  // };

  const handleValues = () => {
    setWeeks(!weeks);
    setMonthes(!monthes);
  };

  return (
    <div
      className="stoke-chart"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Typography variant="h5" component="div" sx={{ m: 1.5 }}>
        Stock
      </Typography>

      <Button
        variant={monthes ? "contained" : "outlined"}
        onClick={handleValues}
      >
        Months{" "}
      </Button>
      <Button variant={weeks ? "contained" : "outlined"} onClick={handleValues}>
        Weeks{" "}
      </Button>

      {!isLoading && limitedData && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth="100px"
          minHeight="50px"
        >
          <LineChart
            width={500}
            height={300}
            data={limitedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              // strokeDasharray="0"
              horizontal
              vertical={false}
              horizontalFill={["#92B4EC", "#9ADCFF"]}
              fillOpacity={0.2}
            />
            <XAxis dataKey="days" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mounthHigh"
              stroke="#8884d8"
              fillOpacity={1}
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="mounthLow" stroke="#82ca9d" />
            <Line type="monotone" dataKey="amt" stroke="#000" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </div>
  );
};

export { StockChart };
