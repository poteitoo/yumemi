import {
  CompositionJpToEnLabelsSchema,
  PopulationCompositionSchemaType,
  FormatedPopulationCompositionSchema,
  PopulationCompositionSchema,
  type FormatedPopulationCompositionSchemaType,
} from "@/entities/resas";
import * as R from "remeda";

export const mergePopulationCompositionByYear = (
  data: PopulationCompositionSchemaType[],
) => {
  const merged = R.pipe(
    PopulationCompositionSchema.array().parse(data),
    R.flatMap((v) =>
      v.data.map(({ value, year }) => ({
        [CompositionJpToEnLabelsSchema.enum[v.label]]: value,
        year,
      })),
    ),
    R.groupBy((v) => v.year),
    R.values,
    R.map((v) => R.mergeAll(v)),
  ) as FormatedPopulationCompositionSchemaType[];
  return FormatedPopulationCompositionSchema.array().parse(merged);
};
