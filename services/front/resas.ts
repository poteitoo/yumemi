import {
  FormatedPopulationCompositionSchema,
  PrefectureSchema,
} from "@/entities/resas";

export const getAllPrefectures = () =>
  fetch("/api/prefectures")
    .then((res) => res.json())
    .then(PrefectureSchema.array().parse);

export const getPopulationCompositionByPrefectureCode = (prefCode: number) =>
  fetch(`/api/prefectures/${prefCode}`)
    .then((res) => res.json())
    .then(FormatedPopulationCompositionSchema.array().parse);

export const getPopulationCompositionsByPrefectureCodes = (
  prefCodes: number[],
) =>
  Promise.all(
    prefCodes.map(async (prefCode) => ({
      prefCode,
      data: await getPopulationCompositionByPrefectureCode(prefCode),
    })),
  );
