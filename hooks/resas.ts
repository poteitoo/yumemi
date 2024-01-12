import {
  getAllPrefectures,
  getPopulationCompositionsByPrefectureCodes,
} from "@/services/front/resas";
import useSWR from "swr";

export const usePrefectures = () => {
  const {
    data: prefectures,
    error,
    isLoading,
  } = useSWR("/api/prefectures", getAllPrefectures);
  return { prefectures, error, isLoading };
};

export const usePopulationCompositions = (prefCodes: number[]) => {
  const {
    data: populationCompositions,
    error,
    isLoading,
  } = useSWR(prefCodes, (prefCodes) =>
    getPopulationCompositionsByPrefectureCodes(prefCodes),
  );
  return { populationCompositions, error, isLoading };
};
