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
    /** If there are no allied forces, but there are Japanese forces */
    if (s.locations[i].player == 0 && s.locations[i].opponent > 0) {
      /**
       * Advance to the next location, collecting the reinforcement bonus
       * If no units are currently present there (this avoids a double bonus in Kluang).
       */
      const reinforcements =
        s.locations[i + 2].opponent > 0 ? 0 : params.reinforcements[i + 2];
      ret.locations[i + 2].opponent = Math.min(
        6,
        s.locations[i + 2].opponent + s.locations[i].opponent + reinforcements
      );
      ret.locations[i].opponent = 0;
      areas.add(params.names.locations[i + 2]);
    }
  }
  if (s.locations[5].player == 0 && s.locations[5].opponent > 0) {
    /**
     * Advance to the next location, collecting the reinforcement bonus
     * If no units are currently present there (this avoids a double bonus in Kluang).
     */
    const reinforcements =
      s.locations[6].opponent > 0 ? 0 : params.reinforcements[6];

    ret.locations[6].opponent = Math.min(
      6,
      s.locations[6].opponent + s.locations[5].opponent + reinforcements
    );
    ret.locations[5].opponent = 0;
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
