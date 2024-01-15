import "@testing-library/jest-dom/vitest";
import { describe, it, vi } from "vitest";
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
      />,
    );
  });
});
