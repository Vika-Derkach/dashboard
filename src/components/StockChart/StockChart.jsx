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

const period = {
  weeks: "weeks",
  monthes: "monthes",
};

const types = {
  [period.monthes]: "MONTHLY",
  [period.weeks]: "WEEKLY",
};

const StockChart = (props) => {
  const { children, value, index, symbol, ...other } = props;
  const [currentPeriod, setCurrentPeriod] = useState(period.monthes);

  const { data, error, isLoading, refetch } = stockAPI.useFetchAllStocksQuery({
    symbolStoke: symbol,
    timeSeties: `TIME_SERIES_${types[currentPeriod]}_ADJUSTED`,
    // : "TIME_SERIES_WEEKLY_ADJUSTED",
  });

  const limitedData = useMemo(() => {
    if (data) {
      const timeSeries = data["Monthly Adjusted Time Series"];
      return Object.keys(timeSeries)
        ?.map((key) => {
          return {
            days: key,
            mounthHigh: timeSeries[key]["2. high"],
            mounthLow: timeSeries[key]["3. low"],
          };
        })
        ?.slice(0, 20)
        .reverse();
    }
  }, [data]);

  console.log(limitedData, "limitedData");

  const handleValues = () => {
    setCurrentPeriod(
      currentPeriod === period.monthes ? period.weeks : period.monthes
    );
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
        variant={currentPeriod === period.monthes ? "contained" : "outlined"}
        onClick={handleValues}
      >
        Months{" "}
      </Button>
      <Button
        variant={currentPeriod === period.weeks ? "contained" : "outlined"}
        onClick={handleValues}
      >
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
