import React, { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { stockAPI } from "../../services/StockServer";
import { ErrorIndicator } from "../ErrorIndicator/ErrorIndicator";
import { Spinner } from "../Spinner/Spinner";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const StockPieChart = () => {
  const { data, error, isLoading, refetch } = stockAPI.useFetchAllStocksQuery({
    symbolStoke: "FB",
    timeSeties: `TIME_SERIES_MONTHLY_ADJUSTED`,
    // : "TIME_SERIES_WEEKLY_ADJUSTED",
  });

  const pieData = useMemo(() => {
    if (data) {
      const timeSeries = data["Monthly Adjusted Time Series"];
      return Object.keys(timeSeries)
        ?.map((key) => {
          return {
            name: key,
            mounthHigh: parseInt(timeSeries[key]["2. high"]),
          };
        })
        ?.slice(0, 12);
      // .reverse();
    }
  }, [data]);
  console.log(pieData, "pie");
  return (
    <>
      years Facebook Stock
      {!isLoading && pieData && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="mounthHigh"
              isAnimationActive={false}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </>
  );
};
export { StockPieChart };
