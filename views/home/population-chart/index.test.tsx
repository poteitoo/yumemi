import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { PopulationChart } from ".";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("PopulationChart", () => {
  it("レンダリングが正しくされているか", async () => {
    render(
      <PopulationChart
        population={[
          {
            prefCode: 1,
            prefName: "北海道",
            data: [{ year: 2000, total: 1000 }],
          },
        ]}
        category="total"
      />,
    );
  });

  it("populationが空の時ヒントが表示される", async () => {
    const { findByText } = render(
      <PopulationChart
        population={[]}
        category="total"
        hint="テスト用ヒント"
      />,
    );
    expect(await findByText("テスト用ヒント")).toBeDefined();
  });
});
