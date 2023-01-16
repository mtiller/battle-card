import Prando from "prando";
import { BattleAction } from "../player";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, MalayanState } from "./state";
import { Location, LossRoll } from "../../generic";

/**
 *
 * @param s Current state
 * @returns whether attack/defend is an option in each location
 */
export function battleOptions(
  s: MalayanState
): [boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
  const battle = (i: number) =>
    s.locations[i].opponent > 0 && s.locations[i].player > 0;

  return [
    battle(0),
    battle(1),
    battle(2),
    battle(3),
    battle(4),
    battle(5),
    battle(6),
  ];
}

export function battleRound(
  s: MalayanState,
  r: Prando,
  params: MalayanParameters,
  action: BattleAction,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  if (s.round !== "battle")
    throw new Error(`called battleRound during ${s.round} roiund`);
  const airsupport = params.airfields.some(
    (loc) => s.locations[loc].player === 0
  );
  for (let i = 0; i < s.locations.length; i++) {
    const decision = action[i];
    if (decision == null) {
      if (s.locations[i].player > 0 && s.locations[i].opponent > 0)
        throw new Error(
          `must choose attack or defend in ${params.names.locations[i]}, chose ${decision} (${s.locations[i].player}, ${s.locations[i].opponent})`
        );
      continue;
    }
    const column = lossRoll(decision, s.locations[i], params);
    const roll = r.nextInt() % 6;
    const loss = column[roll];
    if (airsupport) loss.player++;
    ret.locations[i].player = Math.max(
      0,
      ret.locations[i].player + loss.player
    );
    ret.locations[i].opponent = Math.max(
      0,
      ret.locations[i].opponent + loss.opponent
    );
    log.push({
      type: "battle",
      turn: ret.turn,
      location: i,
      where: params.names.locations[i],
      roll: roll,
      support: airsupport,
      losses: {
        player: ret.locations[i].player - s.locations[i].player,
        opponent: ret.locations[i].opponent - s.locations[i].opponent,
      },
      eliminated: ret.locations[i].player == 0,
      outcome: ret.locations[i],
    });
  }
  ret.round = "withdraw";
  return ret;
}

function lossRoll(
  decision: "attack" | "defend",
  location: Location,
  params: MalayanParameters
): LossRoll {
  if (decision == "attack") {
    if (location.opponent >= location.player * 3) return params.attack.decisive;
    if (location.opponent > location.player) return params.attack.advantage;
    return params.attack.normal;
  } else {
    if (location.opponent >= location.player * 3) return params.defend.decisive;
    if (location.opponent > location.player) return params.defend.advantage;
    return params.defend.normal;
  }
}
