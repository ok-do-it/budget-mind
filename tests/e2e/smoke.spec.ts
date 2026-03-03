import { expect, test } from "@playwright/test"

test("homepage renders scaffold header", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByText("Next.js + tRPC scaffold is running"),
  ).toBeVisible()
})
