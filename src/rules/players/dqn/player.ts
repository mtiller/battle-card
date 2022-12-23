import { DQNEnv, DQNOpt, DQNSolver } from "reinforce-js";
import { Advance, AllBattleDecisions, LegalZoneDecisions } from "../../moves";
import { Player } from "../../player";
import { State } from "../../state";
import { flattenState } from "./input";

export class DQNPlayer implements Player {
  private adv: DQNSolver;
  private zones: [DQNSolver, DQNSolver, DQNSolver, DQNSolver];

  constructor(training: boolean, data?: [any, any, any, any, any]) {
    const width = 400;
    const height = 400;
    const numberOfStates = 1 + 3 + 3 + 3 + 3 + 1 + 1;
    const advanceEnv = new DQNEnv(
      width,
      height,
      numberOfStates,
      3 // "unit" | "corp" | "neither"
    );
    const zoneEnv = new DQNEnv(
      width,
      height,
      numberOfStates,
      2 // "attack" | "defened"
    );

    const opt = new DQNOpt();
    opt.setTrainingMode(training);
    opt.setNumberOfHiddenUnits([100]); // mind the array here, currently only one layer supported! Preparation for DNN in progress...
    opt.setEpsilonDecay(1.0, 0.1, 1e6);
    opt.setEpsilon(0.05);
    opt.setGamma(0.9);
    opt.setAlpha(0.005);
    opt.setLossClipping(true);
    opt.setLossClamp(1.0);
    opt.setRewardClipping(true);
    opt.setRewardClamp(1.0);
    opt.setExperienceSize(1e6);
    opt.setReplayInterval(5);
    opt.setReplaySteps(5);

    /*
      Outfit solver with environment complexity and specs.
      After configuration it's ready to train its untrained Q-Network and learn from SARSA experiences.
      */
    this.adv = new DQNSolver(advanceEnv, opt);
    this.zones = [
      new DQNSolver(zoneEnv, opt),
      new DQNSolver(zoneEnv, opt),
      new DQNSolver(zoneEnv, opt),
      new DQNSolver(zoneEnv, opt),
    ];
    if (data) {
      this.adv.fromJSON(data[0]);
      this.zones[0].fromJSON(data[1]);
      this.zones[1].fromJSON(data[2]);
      this.zones[2].fromJSON(data[3]);
      this.zones[3].fromJSON(data[4]);
    }
  }

  async pickBattles(
    s: State,
    legal: LegalZoneDecisions
  ): Promise<AllBattleDecisions> {
    const decisions = legal.map((moves, i) => {
      if (moves.length == 1) return moves[0];
      const fs = flattenState(s, i + 1);
      const d = this.zones[i].decide(fs);
      const ind = Math.round((d * moves.length) / 3.0) - 1;
      // TODO: Add the reward!
      // TODO: Punish for making an illegal move
      return moves[ind];
    });
    return [decisions[0], decisions[1], decisions[2], decisions[3]];
  }

  async chooseToAdvance(s: State, legal: Advance[]): Promise<Advance> {
    const fs = flattenState(s, 0);
    const d = this.adv.decide(fs);
    // TODO: Figure out possible values for d
    return legal[d];
  }

  done() {}
}
