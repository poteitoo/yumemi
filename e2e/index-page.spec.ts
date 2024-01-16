import { test, expect } from "@playwright/test";

test("都道府県のチェックボックスをクリックすると、クエリパラメータにそれがセット・削除される", async ({
  page,
}) => {
  // indexページに移動
  await page.goto("/");
  // チェックボックスをクリックする
  await page.click('input[type="checkbox"][name="1"]');
  // 001=onがURLに含まれていることを確認する
  await expect(page).toHaveURL(/.*\?001=on/);

  // チェックボックスをクリックする
  await page.click('input[type="checkbox"][name="1"]');
  // 001=onがURLに含まれていないことを確認する
  await expect(page).not.toHaveURL(/.*\?001=on/);
});

test("クエリーパラメータがセットされていたら、都道府県のチェックボックスはチェックされている", async ({
  page,
}) => {
  // indexページにクエリパラメータ付きで移動
  await page.goto("/?001=on");
  // チェックボックスがチェックされていることを確認する
  await expect(page.locator('input[type="checkbox"][name="1"]')).toBeChecked();
});

test("カテゴリーのラジオボタンをクリックすると、クエリパラメータにそれがセット・削除される", async ({
  page,
}) => {
  // indexページに移動
  await page.goto("/");
  // 老年人口をクリックする
  await page.click("text=老年人口");
  // category=elderlyがURLに含まれていることを確認する
  await expect(page).toHaveURL(/.*\?category=elderly/);

  // 年少人口をクリックする
  await page.click("text=年少人口");
  // category=elderlyがURLに含まれていないことを確認する
  await expect(page).not.toHaveURL(/.*\?category=elderly/);
});

test("クエリーパラメータがセットされていたら、カテゴリーのラジオボタンはチェックされている", async ({
  page,
}) => {
  // indexページにクエリパラメータ付きで移動
  await page.goto("/?category=elderly");
  // ラジオボタンがチェックされていることを確認する
  await expect(
    page.locator('input[type="radio"][value="elderly"]'),
  ).toBeChecked();
});

test("都道府県のチェックボックスがチェックされていなければ、ヒントが表示される", async ({
  page,
}) => {
  // indexページに移動
  await page.goto("/");
  // 都道府県がチェックされていないことを確認する
  await expect(
    page.locator('input[type="checkbox"][name="1"]'),
  ).not.toBeChecked();
  // ヒントが表示されていることを確認する
  expect(page.getByText("都道府県を選択してください。")).toBeDefined();
});
