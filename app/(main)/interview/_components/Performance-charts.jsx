"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-gradient-to-br from-[#FCECDD] to-[#FFF3E6] text-[#00809D] border border-[#FF7601]/20 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl text-[#FF7601] font-bold">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-[#00809D]/80">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FF7601" />
              <XAxis
                dataKey="date"
                stroke="#00809D"
                tick={{ fill: "#00809D", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#00809D"
                tick={{ fill: "#00809D", fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-white text-[#00809D] border border-[#FF7601]/40 rounded-lg p-2 shadow-md text-sm">
                        <p className="font-semibold">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs opacity-80">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#FF7601"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#FCECDD", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
