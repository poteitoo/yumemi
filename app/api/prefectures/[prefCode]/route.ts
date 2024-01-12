import { getPopulationCompositionByPrefectureCode } from "@/services/resas";
import { mergePopulationCompositionByYear } from "@/utils/resas";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { prefCode: string } },
) {
  const data = await getPopulationCompositionByPrefectureCode(params.prefCode);
  const mergedPopulationCompositionByYear =
    mergePopulationCompositionByYear(data);
  return NextResponse.json(mergedPopulationCompositionByYear);
}
