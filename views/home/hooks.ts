import { usePopulationCompositions, usePrefectures } from "@/hooks/resas";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useHomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const { prefectures, isLoading: isPrefectureLoading } = usePrefectures();
  const {
    populationCompositions: _populationCompositions,
    isLoading: isPopulationCompositionLoading,
  } = usePopulationCompositions(checkedPrefCodes);

  const _prefectureCodeToJpMap = useMemo(() => {
    const prefectureCodeJp = new Map<number, string>();
    prefectures?.forEach((prefecture) => {
      prefectureCodeJp.set(prefecture.prefCode, prefecture.prefName);
    });
    return prefectureCodeJp;
  }, [prefectures]);

  const populationCompositions = useMemo(() => {
    return _populationCompositions?.map(({ data, prefCode }) => ({
      data,
      prefCode,
      prefName: _prefectureCodeToJpMap.get(prefCode),
    }));
  }, [_populationCompositions, _prefectureCodeToJpMap]);

  useEffect(() => {
    // クエリパラメータからチェックされている都道府県のコードを取得
    const queryParams = new URLSearchParams(searchParams);
    setCheckedPrefCodes(
      Array.from(queryParams.entries())
        .filter(
          ([key, value]) => Number.isInteger(parseInt(key)) && value === "on",
        )
        .map(([key, _value]) => parseInt(key)),
    );
  }, [searchParams]);

  const handleCheckedPrefectureChange = useCallback(
    // クエリパラメータに選択された都道府県のコードをセット
    (prefCode: number, isChecked: boolean) => {
      const queryParams = new URLSearchParams(searchParams);
      if (isChecked) {
        queryParams.set(prefCode.toString().padStart(3, "0"), "on");
      } else {
        queryParams.delete(prefCode.toString().padStart(3, "0"));
      }
      queryParams.sort();
      router.replace(`${pathname}?${queryParams.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return {
    prefectures,
    isPrefectureLoading,
    isPopulationCompositionLoading,
    isLoading: isPrefectureLoading || isPopulationCompositionLoading,
    populationCompositions,
    checkedPrefCodes,
    handleCheckedPrefectureChange,
  };
};
