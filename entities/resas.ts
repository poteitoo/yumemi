import { z } from "zod";

export const PrefectureSchema = z.object({
  prefCode: z.number(),
  prefName: z.string(),
});
export type PrefectureSchemaType = z.infer<typeof PrefectureSchema>;

const TotalPopulationSchema = z.object({
  label: z.enum(["総人口"]),
  data: z
    .object({
      year: z.number(),
      value: z.number(),
    })
    .array(),
});
const BroadPopulationCompositionSchema = z.object({
  label: z.enum(["年少人口", "生産年齢人口", "老年人口"]),
  data: z
    .object({
      year: z.number(),
      value: z.number(),
      rate: z.number(),
    })
    .array(),
});
export const PopulationCompositionSchema = z.union([
  TotalPopulationSchema,
  BroadPopulationCompositionSchema,
]);
export type PopulationCompositionSchemaType = z.infer<
  typeof PopulationCompositionSchema
>;

enum COMPOSITION_JP_TO_EN_LABELS {
  総人口 = "total",
  年少人口 = "young",
  生産年齢人口 = "productive",
  老年人口 = "elderly",
}
export const CompositionJpToEnLabelsSchema = z.nativeEnum(
  COMPOSITION_JP_TO_EN_LABELS,
);
export type CompositionJpToEnLabelsSchemaType = z.infer<
  typeof CompositionJpToEnLabelsSchema
>;

export const FormatedPopulationCompositionSchema = z.object({
  total: z.number().optional(),
  young: z.number().optional(),
  productive: z.number().optional(),
  elderly: z.number().optional(),
  year: z.number(),
});
export type FormatedPopulationCompositionSchemaType = z.infer<
  typeof FormatedPopulationCompositionSchema
>;
