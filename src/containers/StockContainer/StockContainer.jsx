import { Button, ButtonGroup } from "@mui/material";
import React, { useMemo, useState } from "react";
import { ErrorIndicator, Spinner, StockChart } from "../../components";
import { stockAPI } from "../../services/StockServer";
import "./StockContainer.css";

const period = {
  weeks: "weeks",
  monthes: "monthes",
};

const types = {
  [period.monthes]: "MONTHLY",
  [period.weeks]: "WEEKLY",
};

const typesLower = {
  [period.monthes]: "Monthly",
  [period.weeks]: "Weekly",
};

const StockContainer = (props) => {
  const { children, value, index, symbol, ...other } = props;
  const [currentPeriod, setCurrentPeriod] = useState(period.monthes);

  const { data, error, isLoading, refetch } = stockAPI.useFetchAllStocksQuery({
    symbolStoke: symbol,
    timeSeties: `TIME_SERIES_${types[currentPeriod]}_ADJUSTED`,
  });

  const limitedData = useMemo(() => {
    if (data && data[`${typesLower[currentPeriod]} Adjusted Time Series`]) {
      const timeSeries =
        data[`${typesLower[currentPeriod]} Adjusted Time Series`];
      return Object.keys(timeSeries)
        ?.map((key) => {
          return {
            days: key,
            mounthHigh: parseInt(timeSeries[key]["2. high"]),
            mounthLow: parseInt(timeSeries[key]["3. low"]),
          };
        })
        ?.slice(0, 12)
        .reverse();
    }
  }, [data, currentPeriod]);

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
      <ButtonGroup sx={{ m: 1.5 }}>
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
      </ButtonGroup>

      {!isLoading && limitedData && <StockChart limitedData={limitedData} />}
      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </div>
  );
};

export { StockContainer };
