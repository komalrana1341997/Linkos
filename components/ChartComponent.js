"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ChartComponent({ links }) {
  // Convert data
  const data = (links || []).map(link => ({
    name: link.title,
    clicks: link.clicks || 0
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}