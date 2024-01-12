import { describe, expect, it } from "vitest";
import { mergePopulationCompositionByYear } from ".";
import { type PopulationCompositionSchemaType } from "@/entities/resas";

describe("mergePopulationCompositionByYear", () => {
  it("正常なデータで正しい結果を返す", () => {
    const inputData: PopulationCompositionSchemaType[] = [
      {
        label: "総人口",
        data: [
          { year: 2020, value: 1000 },
          { year: 2021, value: 1010 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 2020, value: 2003, rate: 210 },
          { year: 2021, value: 210, rate: 221 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 2020, value: 2100, rate: 220 },
          { year: 2021, value: 3210, rate: 213 },
        ],
      },
      {
        label: "老年人口",
        data: [
          { year: 2020, value: 1200, rate: 230 },
          { year: 2021, value: 2310, rate: 211 },
        ],
      },
    ];
    const expectedOutput = [
      {
        total: 1000,
        year: 2020,
        young: 2003,
        productive: 2100,
        elderly: 1200,
      },
      {
        total: 1010,
        year: 2021,
        young: 210,
        productive: 3210,
        elderly: 2310,
      },
    ];
    const merged = mergePopulationCompositionByYear(inputData);
    expect(merged).toEqual(expectedOutput);
  });

  it("異常な入力データに対して適切なエラーを返す", () => {
    const badInputData = [{ label: "不正なラベル", data: [] }];
    expect(() => {
      mergePopulationCompositionByYear(badInputData as any);
    }).toThrowError();
  });

  it("空の入力データに対して空の配列を返す", () => {
    const emptyInputData = [] as any[];
    expect(mergePopulationCompositionByYear(emptyInputData)).toEqual([]);
  });
});
