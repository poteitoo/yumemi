import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CategoryRadioList } from ".";

describe("CategoryRadioList", () => {
  it("レンダリングが正しくされているか", async () => {
    const onCategoryChange = vi.fn();
    const { findByText, findByLabelText } = render(
      <CategoryRadioList
        category="total"
        onCategoryChange={onCategoryChange}
      />,
    );

    // カテゴリーが正しくレンダリングされるかテスト
    expect(await findByText("総人口")).toBeDefined();
    expect(await findByText("老年人口")).toBeDefined();

    // ラジオボタンの存在を確認
    expect(await findByLabelText("総人口")).toBeDefined();
    expect(await findByLabelText("老年人口")).toBeDefined();

    // categoryに入っている要素のみチェックされる
    expect(await findByLabelText("総人口")).toBeChecked();
    expect(await findByLabelText("老年人口")).not.toBeChecked();
  });

  it("ラジオボックスのチェックが正しく切り替わるか", async () => {
    const onCategoryChange = vi.fn();
    const { findByLabelText } = render(
      <CategoryRadioList
        category="total"
        onCategoryChange={onCategoryChange}
      />,
    );

    // 老年人口をクリックするとチェックが付く
    const radio = await findByLabelText("老年人口");
    radio.click();
    expect(onCategoryChange).toBeCalled();
  });
});
