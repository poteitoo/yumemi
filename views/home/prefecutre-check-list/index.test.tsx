import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { PrefectureCheckList } from ".";

describe("PrefectureCheckList", () => {
  it("レンダリングが正しくされているか", async () => {
    const onCheckChange = vi.fn();
    const { findByText, findByLabelText } = render(
      <PrefectureCheckList
        prefectures={[
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
        ]}
        checkedPrefCodes={[1]}
        onCheckChange={onCheckChange}
      />,
    );

    // 都道府県が正しくレンダリングされるかテスト
    expect(await findByText("北海道")).toBeDefined();
    expect(await findByText("青森県")).toBeDefined();

    // チェックボックスの存在を確認
    expect(await findByLabelText("北海道")).toBeDefined();
    expect(await findByLabelText("青森県")).toBeDefined();

    // checkedPrefCodesに入っている要素のみチェックされる
    expect(await findByLabelText("北海道")).toBeChecked();
    expect(await findByLabelText("青森県")).not.toBeChecked();
  });

  it("チェックボックスのチェックが正しく切り替わるか", async () => {
    const onCheckChange = vi.fn();
    const { findByLabelText } = render(
      <PrefectureCheckList
        prefectures={[
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
        ]}
        checkedPrefCodes={[1]}
        onCheckChange={onCheckChange}
      />,
    );

    // 北海道をクリックするとチェックが外れる
    const checkbox1 = await findByLabelText("北海道");
    checkbox1.click();
    expect(onCheckChange).toBeCalledWith(1, false);

    // 青森県をクリックするとチェックが付く
    const checkbox2 = await findByLabelText("青森県");
    checkbox2.click();
    expect(onCheckChange).toBeCalledWith(2, true);
  });
});
