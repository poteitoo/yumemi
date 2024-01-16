import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "人口構成チャート",
  description:
    "日本の都道府県別人口構成を探求するための包括的なプラットフォーム。総人口、年少人口、生産年齢人口、老年人口をカテゴリー別に分析し、各都道府県の人口動態を詳細なチャートで視覚化。教育、研究、政策立案、一般の学習に最適。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
