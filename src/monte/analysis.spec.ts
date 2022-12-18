import { expect, test } from "vitest";
import { monteCarlo } from "./analysis";

test("Run Monte-Carlo analysis", async () => {
  const n = 10000;
  const results = await monteCarlo(n);
  expect(results.length).toEqual(n);
  const won = results.filter((r) => r.final.outcome === "won").length;
  const loss = results.filter((r) => r.final.outcome === "lost").length;
  expect(won + loss).toEqual(n);
  expect(won).toEqual(10000);
  expect(loss).toEqual(0);
});
