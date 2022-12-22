import Prando from "prando";
import { clone, State } from "../state";
import { GameParameters } from "../parameters";

export function performAirdrop(
  s: State,
  params: GameParameters,
  chance: Prando
): State {
  const ret = clone(s);
  const losses: [number, number, number] = [
    chance.nextArrayItem(params.airdropLossesByZone[0]),
    chance.nextArrayItem(params.airdropLossesByZone[1]),
    chance.nextArrayItem(params.airdropLossesByZone[2]),
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

  ret.zones[0].allied = allied1;
  ret.zones[1].allied = allied2;
  ret.zones[3].allied = allied4;
  ret.log.push({ type: "initial_airdrop", day: ret.day, losses });
  return ret;
}

export function attemptDrop(
  s: State,
  params: GameParameters,
  chance: Prando
): State {
  const ret = clone(s);
  const roll = chance.nextInt(1, 6);
  const weather = params.weatherTrack[s.day - 1];
  ret.log.push({ type: "weather", roll, day: ret.day, needed: weather });
  if (roll >= weather) {
    ret.zones[3].allied = Math.min(6, ret.zones[3].allied + 1);
    ret.dropped = true;
  }
  return ret;
}
