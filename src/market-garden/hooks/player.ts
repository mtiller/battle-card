import React from "react";
import {
  LegalZoneDecisions,
  AllBattleDecisions,
  Advance,
} from "../rules/moves";
import { Player } from "../rules/player";
import { initial, MarketGardenState } from "../rules/state";
import { usePromise } from "../../hooks/promise";

export function usePlayer(setState: (s: MarketGardenState) => void) {
  const [zones, setZones] = React.useState<LegalZoneDecisions | null>(null);
  const [advance, setAdvance] = React.useState<Advance[] | null>(null);
  const battleMove = usePromise<AllBattleDecisions>();
  const advanceMove = usePromise<Advance>();
  const [count, setCount] = React.useState(0);

  const player: Player = React.useMemo(() => {
    return {
      pickBattles: (
        s: MarketGardenState,
        legal: LegalZoneDecisions
      ): Promise<AllBattleDecisions> => {
        setState(s);
        console.log("Web Player set state to ", s);
        setZones(legal);
        battleMove.activate();
        return battleMove.promise!;
      },
      chooseToAdvance: (
        s: MarketGardenState,
        legal: Advance[]
      ): Promise<Advance> => {
        setState(s);
        setAdvance(legal);
        advanceMove.activate();
        return advanceMove.promise!;
      },
      done: (s: MarketGardenState) => {
        setState(s);
      },
    };
  }, []);

  return {
    zones,
    advance,
    player,
    count,
    reset: () => {
      advanceMove.reset();
      battleMove.reset();
      setState(initial);
      setCount(count + 1);
    },
  };
}
