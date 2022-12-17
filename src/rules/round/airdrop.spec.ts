import Prando from "prando";
import { expect, test } from "vitest";
import { clone, initial } from "../state";
import { performAirdrop } from "./airdrop";
import { gameParameters } from "../parameters";

test("Test initial airdrop", () => {
  const chance = new Prando(1);
  let final = performAirdrop(clone(initial), gameParameters, chance);
  expect(final.log[0]).toEqual("Initial allied airdrop results: -1, -1, 0");
  final = performAirdrop(clone(initial), gameParameters, chance);
  expect(final.log[0]).toEqual("Initial allied airdrop results: -2, -2, 0");
  final = performAirdrop(clone(initial), gameParameters, chance);
  expect(final.log[0]).toEqual("Initial allied airdrop results: -1, -1, -1");
});
