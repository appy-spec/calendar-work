import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

const moodColors = {
  jolly: "#FFD700",
  excited: "#FF8C00",
  happy: "#4CAF50",
  sad: "#2196F3",
  awesome: "#9C27B0"
};

const Viewtrend = ({ data }) => {
    
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>Temperature vs Date (Mood Labeled)</h3>
      <ResponsiveContainer>
        <LineChart data={sortedData} margin={{ top: 20, right: 20, bottom: 40, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} />
          <YAxis label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }} />
          <Tooltip
            formatter={(value, name, props) => [`${value}°C`, "Temperature"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            dot={{
              stroke: "#8884d8",
              strokeWidth: 2,
              r: 6,
              fill: "#fff"
            }}
          >
            <LabelList
              dataKey="mood"
              position="top"
              style={{ fontSize: 12, fill: "#333" }}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Viewtrend;
