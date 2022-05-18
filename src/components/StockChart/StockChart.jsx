import { Typography } from "@mui/material";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./StockChart.css";

const StockChart = ({ limitedData }) => {
  return (
    <>
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
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="h5" component="div" sx={{ m: 1.5 }} align="center">
        PieChart
      </Typography>
      <ResponsiveContainer width="100%" height="60%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="mounthHigh"
            nameKey="days"
            data={limitedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export { StockChart };
