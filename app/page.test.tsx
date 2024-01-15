import "@testing-library/jest-dom/vitest";
import { test, vi } from "vitest";
import { render } from "@testing-library/react";
import Page from "./page";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

test("Home Page", () => {
  render(<Page />);
});
