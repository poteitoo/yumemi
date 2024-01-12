import {
  PopulationCompositionSchema,
  PrefectureSchema,
} from "@/entities/resas";

const RESAS_BASE_URL = "https://opendata.resas-portal.go.jp";
const headers = new Headers();
headers.append("X-API-KEY", process.env.RESAS_API_KEY || "");

export const getPrefectures = async () =>
  fetch(`${RESAS_BASE_URL}/api/v1/prefectures`, {
    headers,
    next: { revalidate: false },
  })
    .then((res) => res.json())
    .then((res) => PrefectureSchema.array().parse(res.result));

export const getPopulationCompositionByPrefectureCode = async (
  prefCode: string,
) => {
  const params = new URLSearchParams({
    prefCode: prefCode,
    cityCode: "-",
  }).toString();
  return fetch(
    `${RESAS_BASE_URL}/api/v1/population/composition/perYear?${params}`,
    {
      headers,
      next: { revalidate: 60 * 60 * 24 }, // cache 24 hours
    },
  )
    .then((res) => res.json())
    .then((res) => PopulationCompositionSchema.array().parse(res.result.data));
};
