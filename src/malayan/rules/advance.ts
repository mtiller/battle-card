import { niceList } from "../../generic/list";
import { gameParameters } from "../../market-garden/rules";
import { MalayanLog } from "./log";
import { names } from "./names";
import { malayanParameters } from "./parameters";
import { clone, MalayanState } from "./state";

export function advanceRound(s: MalayanState, log: MalayanLog): MalayanState {
  const ret = clone(s);
  const areas = new Set<string>();
  for (let i = 0; i < 5; i++) {
    if (s.locations[i].player == 0 && s.locations[i].opponent > 0) {
      s.locations[i + 2].opponent += Math.min(
        6,
        s.locations[i].opponent + malayanParameters.reinforcements[i + 2]
      );
      s.locations[i].opponent = 0;
      areas.add(names.locations[i + 2]);
    }
  }
  if (s.locations[5].player == 0 && s.locations[5].opponent > 0) {
    // TODO: reinforcement might depend on whether Kluang is in the areas set?!?
    // or otherwise previous reinforced?
    s.locations[6].opponent += Math.min(
      s.locations[6].opponent + malayanParameters.reinforcements[6]
    );
    s.locations[5].opponent = 0;
    areas.add(names.locations[6]);
  }

  log.push({
    type: "advance",
    who: names.opponent,
    areas: niceList([...areas], "nowhere"),
  });

  return ret;
}
