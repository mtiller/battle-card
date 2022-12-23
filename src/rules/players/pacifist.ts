import { Advance, AllBattleDecisions, LegalZoneDecisions } from "../moves";
import { Player } from "../player";
import { State } from "../state";

export class PacifistPlayer implements Player {
  async pickBattles(
    s: State,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions> {
    const decisions = legal.map((x) =>
      x.includes("defend") ? "defend" : x[0]
    );
    return [decisions[0], decisions[1], decisions[2], decisions[3]];
  }
  async chooseToAdvance(s: State): Promise<Advance> {
    return "nothing";
  }
  informBattle(s: State): void {
    return;
  }
  informAdvance(s: State): void {
    return;
  }
  done() {}
}
