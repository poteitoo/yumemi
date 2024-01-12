import { getPrefectures } from "@/services/resas";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getPrefectures();
  return NextResponse.json(data);
}
