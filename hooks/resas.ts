import {
  getAllPrefectures,
  getPopulationCompositionsByPrefectureCodes,
} from "@/services/front/resas";
import useSWRImmutable from "swr/immutable";

export const usePrefectures = () => {
  const {
    data: prefectures,
    mutate: _mutate,
    ...others
  } = useSWRImmutable("/api/prefectures", getAllPrefectures);
  return { prefectures, ...others };
};

export const usePopulationCompositions = (prefCodes: number[]) => {
  const {
    data: populationCompositions,
    mutate: _mutate,
    ...others
  } = useSWRImmutable(prefCodes, (prefCodes) =>
    getPopulationCompositionsByPrefectureCodes(prefCodes),
  );
  return { populationCompositions, ...others };
};
