import { type FormatedPopulationCompositionSchemaType } from "@/entities/resas";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  population?: {
    prefName?: string;
    prefCode: string | number;
    data: FormatedPopulationCompositionSchemaType[];
  }[];
};

export const PopulationChart = ({ population }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        {population?.map(({ prefCode, data, prefName }) => (
          <Line
            isAnimationActive={false}
            key={prefCode}
            data={data}
            dataKey="total"
            name={prefName}
          />
        ))}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Legend verticalAlign="bottom" height={36} />
        <XAxis dataKey="year" type="number" domain={["auto", "auto"]} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
