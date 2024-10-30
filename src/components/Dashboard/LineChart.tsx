import { colors } from "@/constants/color";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineChartProps = {
  data?: any[];
};
const LineCharts = ({ data = [] }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ fontSize: 10, textAnchor: "end" }}
        />
        <YAxis tick={{ fontSize: 10, textAnchor: "end" }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="matched"
          stroke={colors.primary}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
