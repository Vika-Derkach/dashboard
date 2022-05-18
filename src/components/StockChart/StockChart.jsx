import React, { useMemo } from "react";
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
import { ErrorIndicator } from "../../components";
import { stockAPI } from "../../services/StockServer";
import { Spinner } from "../Spinner/Spinner";
import "./StockChart.css";

const StockChart = (props) => {
  const { children, value, index, symbol, ...other } = props;

  const { data, error, isLoading, refetch } =
    stockAPI.useFetchAllStocksQuery(symbol);

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

  const limitedData = monthlyData?.slice(0, 20).reverse();
  console.log(limitedData, "limitedData");

  return (
    <div
      className="stoke-chart"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="days" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mounthValue"
              stroke="#8884d8"
              fillOpacity={1}
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#000" /> */}
          </LineChart>
        </ResponsiveContainer>
      )}

      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </div>
  );
};

export { StockChart };
