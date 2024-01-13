import "@testing-library/jest-dom/vitest";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import Page from "./page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

test("Home Page", () => {
  const { getByRole } = render(<Page />);
  expect(getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
