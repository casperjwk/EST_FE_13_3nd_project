import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 꺾은선 차트 임시 데이터
const lineData = [
  { month: "2월", userCount: 450, aiCount: 1650 },
  { month: "3월", userCount: 620, aiCount: 2400 },
  { month: "4월", userCount: 800, aiCount: 2980 },
  { month: "5월", userCount: 910, aiCount: 3600 },
  { month: "6월", userCount: 1020, aiCount: 4120 },
  { month: "7월", userCount: 1100, aiCount: 4520 },
];

const DashboardChart = () => {
  const [colors, setColors] = useState({
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    tag: "var(--tag)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    gray2: "var(--gray-2)",
  });

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setColors({
      primary: rootStyle.getPropertyValue("--primary").trim() || "var(--primary)",
      secondary: rootStyle.getPropertyValue("--secondary").trim() || "var(--secondary)",
      tag: rootStyle.getPropertyValue("--tag").trim() || "var(--tag)",
      warning: rootStyle.getPropertyValue("--warning").trim() || "var(--warning)",
      danger: rootStyle.getPropertyValue("--danger").trim() || "var(--danger)",
      gray2: rootStyle.getPropertyValue("--gray-2").trim() || "var(--gray-2)",
    });
  }, []);

  // 도넛 차트 데이터
  const pieData = [
    { name: "우유", value: 42, color: colors.primary },
    { name: "달걀", value: 28, color: colors.secondary },
    { name: "견과류", value: 15, color: colors.tag },
    { name: "돼지고기", value: 8, color: colors.warning },
    { name: "갑각류", value: 4, color: colors.danger },
    { name: "기타", value: 3, color: colors.gray2 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 꺾은선 차트 영역 */}
      <div
        style={{
          width: "100%",
          height: 350,
          backgroundColor: "var(--white-1)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid var(--gray-1)",
        }}
      >
        <h3 className="text-button-m" style={{ marginBottom: "20px", color: "var(--black-1)" }}>
          일별 회원 가입 및 AI 레시피 검색 추이
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--gray-1)" />
            <XAxis dataKey="month" stroke="var(--gray-3)" tickLine={false} style={{ fontSize: "var(--xsmall)" }} />
            <YAxis
              domain={[0, 5000]}
              ticks={[0, 1250, 2500, 3750, 5000]}
              stroke="var(--gray-3)"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "var(--xsmall)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--white-1)",
                borderRadius: "8px",
                border: "1px solid var(--gray-1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: "var(--small)",
              }}
              formatter={(value, name) => [
                `${value.toLocaleString()}개`,
                name === "userCount" ? "가입 회원 수" : "실시간 AI 변환 요청량",
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "var(--small)", color: "var(--black-2)" }}
            />
            <Line
              type="monotone"
              dataKey="userCount"
              name="가입 회원 수"
              stroke={colors.primary}
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#FFF", stroke: colors.primary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: colors.primary }}
            />
            <Line
              type="monotone"
              dataKey="aiCount"
              name="실시간 AI 변환 요청량"
              stroke={colors.secondary}
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#FFF", stroke: colors.secondary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: colors.secondary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 도넛 차트 영역 (범례 및 간격 개선 적용) */}
      <div
        style={{
          width: "100%",
          height: 360,
          backgroundColor: "var(--white-1)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid var(--gray-1)",
        }}
      >
        <h3 className="text-button-m" style={{ marginBottom: "20px", color: "var(--black-1)" }}>
          보유 알레르기 & 비건 비율
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie data={pieData} cx="40%" cy="50%" innerRadius={65} outerRadius={105} dataKey="value" paddingAngle={3}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--white-1)",
                borderRadius: "8px",
                border: "1px solid var(--gray-1)",
                fontSize: "var(--small)",
              }}
              formatter={value => [`${value}%`, "비율"]}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconSize={12}
              wrapperStyle={{
                right: "15%",
                lineHeight: "32px",
              }}
              formatter={value => (
                <span
                  style={{
                    fontSize: "14px",
                    color: "var(--black-2)",
                    fontWeight: 500,
                    marginLeft: "6px",
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
