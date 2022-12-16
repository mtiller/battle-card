import Prando from "prando";
import { clone, State } from "../state";

export function performAirdrop(s: State, chance: Prando): State {
  const table = [-2, -2, -1, -1, 0, 0];
  const ret = clone(s);
  const losses = [
    chance.nextArrayItem(table),
    chance.nextArrayItem(table),
    chance.nextArrayItem(table),
  ];
  let allied1 = ret.zones[0].allied;
  let allied2 = ret.zones[1].allied;
  let allied4 = ret.zones[3].allied;

  if (allied1 === 0)
    throw new Error("Invalid initial allied strength in zone 1");
  if (allied2 === 0)
    throw new Error("Invalid initial allied strength in zone 2");
  if (allied4 === 0)
    throw new Error("Invalid initial allied strength in zone 4");

  allied1 += losses[0];
  allied2 += losses[1];
  allied4 += losses[2];

  if (allied1 < 1 || allied2 < 1 || allied4 < 1)
    throw new Error("Invalid initial allied strength after airdrop");

  ret.log = [
    ...ret.log,
    `Initial allied airdrop results: ${losses.join(", ")}`,
  ];
  return ret;
}

export function attemptDrop(s: State): State {
  throw new Error("Unimplemented");
}
