import {
  CompositionEnToJpLabelKeys,
  type FormatedPopulationCompositionSchemaType,
} from "@/entities/resas";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import style from "./styles.module.css";

type Props = {
  population?: {
    prefName?: string;
    prefCode: string | number;
    color?: string;
    data: FormatedPopulationCompositionSchemaType[];
  }[];
  category: CompositionEnToJpLabelKeys;
  hint?: string;
};

export const PopulationChart = ({ population, category, hint }: Props) => {
  if (!population || population.length === 0) return <p>{hint}</p>;
  return (
    <div className={style.container}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart margin={{ top: 50, right: 20, bottom: 5, left: 20 }}>
          {population.map(({ prefCode, data, prefName, color }) => (
            <Line
              isAnimationActive={false}
              key={prefCode}
              data={data}
              dataKey={category}
              name={prefName}
              stroke={color}
            />
          ))}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="bottom" height={36} />
          <XAxis dataKey="year" type="number" domain={["auto", "auto"]}>
            <Label value="年度" offset={-10} position="insideBottomRight" />
          </XAxis>
          {/* 桁が大きすぎて見づらいので、単位を万単位にする。 */}
          <YAxis tickFormatter={(item) => (item / 10000).toString()}>
            <Label value="人数(万人)" offset={20} position="top" />
          </YAxis>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
