import { assert, expect, test } from "vitest";
import { initial, serialize } from "./state";

test("Serializing state", () => {
  const is = serialize(initial);
  expect(is).toEqual("1|6/2/g|6/2/g|0/1/g|4/2/g|N|Uq|belgium");
});
