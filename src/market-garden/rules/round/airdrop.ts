import Prando from "prando";
import { clone, MarketGardenState } from "../state";
import { GameParameters } from "../parameters";

export function performAirdrop(
  s: MarketGardenState,
  params: GameParameters,
  chance: Prando
): MarketGardenState {
  const ret = clone(s);
  const rolls: [number, number, number] = [
    chance.nextInt(0, 5),
    chance.nextInt(0, 5),
    chance.nextInt(0, 5),
  ];
  const losses: [number, number, number] = [
    params.airdropLossesByZone[0][rolls[0]],
    params.airdropLossesByZone[1][rolls[1]],
    params.airdropLossesByZone[2][rolls[2]],
  ];
  let allied1 = ret.zones[0].allies;
  let allied2 = ret.zones[1].allies;
  let allied4 = ret.zones[3].allies;

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

  ret.zones[0].allies = allied1;
  ret.zones[1].allies = allied2;
  ret.zones[3].allies = allied4;
  ret.log.push({ type: "initial_airdrop", day: ret.day, rolls: rolls, losses });
  return ret;
}

export function attemptDrop(
  s: MarketGardenState,
  params: GameParameters,
  chance: Prando
): MarketGardenState {
  const ret = clone(s);
  const roll = chance.nextInt(1, 6);
  const weather = params.weatherTrack[s.day - 1];
  ret.log.push({ type: "weather", roll, day: ret.day, needed: weather });
  if (roll >= weather) {
    ret.zones[3].allies = Math.min(6, ret.zones[3].allies + 1);
    ret.dropped = true;
  }
  return ret;
}
