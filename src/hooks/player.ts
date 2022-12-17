import React from "react";
import {
  LegalZoneDecisions,
  AllBattleDecisions,
  Advance,
} from "../rules/moves";
import { Player } from "../rules/player";
import { State } from "../rules/state";

export function usePlayer() {
  const [zones, setZones] = React.useState<LegalZoneDecisions | null>(null);
  const [advance, setAdvance] = React.useState<Advance[] | null>(null);
  const player: Player = React.useMemo(() => {
    return {
      pickBattles: (
        s: State,
        legal: LegalZoneDecisions
      ): Promise<AllBattleDecisions> => {
        setZones(legal);
        return new Promise((resolve, reject) => {});
      },
      chooseToAdvance: (s: State, legal: Advance[]): Promise<Advance> => {
        setAdvance(legal);
        return new Promise((resolve, reject) => {});
      },
    };
  }, []);

  return {
    zones,
    advance,
    player,
  };
}
