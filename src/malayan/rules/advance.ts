import { niceList } from "../../generic/list";
import { MalayanLog } from "./log";
import { MalayanParameters } from "./parameters";
import { clone, MalayanState } from "./state";

export function advanceRound(
  s: MalayanState,
  params: MalayanParameters,
  log: MalayanLog
): MalayanState {
  const ret = clone(s);
  const areas = new Set<string>();
  for (let i = 0; i < 5; i++) {
    if (s.locations[i].player == 0 && s.locations[i].opponent > 0) {
      s.locations[i + 2].opponent += Math.min(
        6,
        s.locations[i].opponent + params.reinforcements[i + 2]
      );
      s.locations[i].opponent = 0;
      areas.add(params.names.locations[i + 2]);
    }
  }
  if (s.locations[5].player == 0 && s.locations[5].opponent > 0) {
    // TODO: reinforcement might depend on whether Kluang is in the areas set?!?
    // or otherwise previous reinforced?
    s.locations[6].opponent += Math.min(
      6,
      s.locations[6].opponent + params.reinforcements[6]
    );
    s.locations[5].opponent = 0;
    areas.add(params.names.locations[6]);
  }

  log.push({
    type: "advance",
    turn: ret.turn,
    who: params.names.opponent,
    areas: niceList([...areas], "nowhere"),
  });

  ret.round = "battle";
  return ret;
}
