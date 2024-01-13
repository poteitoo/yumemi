"use client";

import { usePopulationCompositions, usePrefectures } from "@/hooks/resas";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useHomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const { prefectures, error, isLoading } = usePrefectures();
  const { populationCompositions } =
    usePopulationCompositions(checkedPrefCodes);

  const handleCheckedPrefectureChange = useCallback(
    // クエリパラメータに選択された都道府県のコードをセット
    (prefCode: number, isChecked: boolean) => {
      const queryParams = new URLSearchParams(searchParams);
      if (isChecked) {
        queryParams.set(prefCode.toString(), "on");
      } else {
        queryParams.delete(prefCode.toString());
      }
      router.replace(`${pathname}?${queryParams.toString()}`);
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    // クエリパラメータからチェックされている都道府県のコードを取得
    const queryParams = new URLSearchParams(searchParams);
    setCheckedPrefCodes(
      Array.from(queryParams.entries())
        .filter(
          ([key, value]) => Number.isInteger(parseInt(key)) && value === "on",
        )
        .map(([key, value]) => parseInt(key)),
    );
  }, [searchParams]);

  return {
    prefectures,
    error,
    isLoading,
    populationCompositions,
    checkedPrefCodes,
    handleCheckedPrefectureChange,
  };
};
