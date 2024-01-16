import { usePopulationCompositions, usePrefectures } from "@/hooks/resas";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CompositionEnToJpLabelKeys } from "@/entities/resas";

export const useHomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedCategory, setCheckedCategory] =
    useState<CompositionEnToJpLabelKeys>("productive");
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const { prefectures, isLoading: isPrefectureLoading } = usePrefectures();
  const {
    populationCompositions: _populationCompositions,
    isLoading: isPopulationCompositionLoading,
  } = usePopulationCompositions(checkedPrefCodes);

  const _prefectureCodeToColorMap = useMemo(() => {
    const prefectureCodeJp = new Map<number, string>();
    prefectures?.forEach((prefecture) => {
      prefectureCodeJp.set(prefecture.prefCode, generateRandomHexColor());
    });
    return prefectureCodeJp;
  }, [prefectures]);

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
      color: _prefectureCodeToColorMap.get(prefCode),
    }));
  }, [
    _populationCompositions,
    _prefectureCodeToJpMap,
    _prefectureCodeToColorMap,
  ]);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    // クエリパラメータから都道府県のコードを取得。
    const preCheckedPrefCodes = Array.from(queryParams.entries())
      .filter(
        ([key, value]) => Number.isInteger(parseInt(key)) && value === "on",
      )
      .filter(([key, _value]) => 0 < parseInt(key) && parseInt(key) <= 47)
      .map(([key, _value]) => parseInt(key));
    setCheckedPrefCodes(preCheckedPrefCodes);

    // クエリパラメータからカテゴリを取得。デフォルトは総人口
    setCheckedCategory(
      (queryParams.get("category") || "total") as CompositionEnToJpLabelKeys,
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

  const handleCategoryChange = useCallback(
    (category: CompositionEnToJpLabelKeys) => {
      const queryParams = new URLSearchParams(searchParams);
      queryParams.set("category", category);
      queryParams.sort();
      router.replace(`${pathname}?${queryParams.toString()}`);
      setCheckedCategory(category);
    },
    [router, pathname, searchParams],
  );

  return {
    checkedCategory,
    prefectures,
    isPrefectureLoading,
    isPopulationCompositionLoading,
    isLoading: isPrefectureLoading || isPopulationCompositionLoading,
    populationCompositions,
    checkedPrefCodes,
    handleCheckedPrefectureChange,
    handleCategoryChange,
  };
};

const generateRandomHexColor = () =>
  "#" +
  Array(3)
    .fill(0)
    .map(() =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
