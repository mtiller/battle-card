import Prando from "prando";
import { clone, State } from "../state";
import { GameParameters } from "../parameters";

export function performAirdrop(
  s: State,
  params: GameParameters,
  chance: Prando
): State {
  const ret = clone(s);
  const losses = [
    chance.nextArrayItem(params.airdropLosses),
    chance.nextArrayItem(params.airdropLosses),
    chance.nextArrayItem(params.airdropLosses),
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
  ret.log = [
    ...ret.log,
    `Initial allied airdrop results: ${losses.join(", ")}`,
  ];
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
  if (roll >= weather) {
    ret.zones[3].allied = Math.min(6, ret.zones[3].allied + 1);
    ret.dropped = true;
    ret.log.push(
      `Allies rolled a ${roll} on day ${ret.day}.  Needed a ${weather} so airdrop of 1st Airborne reinforcements succeeded.`
    );
  } else {
    ret.log.push(
      `Allies rolled a ${roll} on day ${ret.day}.  Needed a ${weather}, no airdrop.`
    );
  }
  return ret;
}
