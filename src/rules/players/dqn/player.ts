import { DQNEnv, DQNOpt, DQNSolver } from "reinforce-js";
import { Advance, AllBattleDecisions, LegalZoneDecisions } from "../../moves";
import { Player } from "../../player";
import { State, Zone } from "../../state";
import { flattenState } from "./input";

const winReward = 1.0;
const lossReward = -2.0;
const strengthReward = 0.1;
const controlReward = 0.1;

const corpAdvanceReward = 0.2;
const illegalReward = -0.1;

export class DQNPlayer implements Player {
  private adv: DQNSolver;
  private zones: [DQNSolver, DQNSolver, DQNSolver, DQNSolver];

  private lastBattle: AllBattleDecisions | undefined = undefined;
  private advanceLegal: boolean = true;

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
      if (d == 0) {
        if (moves.includes("defend")) return "defend";
        else {
          console.warn("Chose defend when it was not an option!");
          return moves[0];
        }
      } else if (d == 1) {
        if (moves.includes("attack")) return "attack";
        else {
          console.warn("Chose attack when it was not an option!");
          return moves[0];
        }
      } else {
        console.warn("Got battle action of " + d);
        return moves[0];
      }
    });
    const ret = [
      decisions[0],
      decisions[1],
      decisions[2],
      decisions[3],
    ] as AllBattleDecisions;
    this.lastBattle = ret;
    return ret;
  }

  informBattle(before: State, after: State): void {
    for (let i = 0; i < 4; i++) {
      if (this.lastBattle && this.lastBattle[i] !== "na") {
        this.zones[i].learn(
          zoneReward(before.zones[i], after.zones[i]) + outcomeReward(after)
        );
      }
    }
    this.lastBattle = undefined;
  }

  async chooseToAdvance(s: State, legal: Advance[]): Promise<Advance> {
    const fs = flattenState(s, 0);
    const d = this.adv.decide(fs);
    switch (d) {
      case 0: {
        if (legal.includes("nothing")) return "nothing";
        this.advanceLegal = false;
        console.warn("Picked nothing, but that wasn't an option");
        return legal[0];
      }
      case 1: {
        if (legal.includes("unit")) return "unit";
        this.advanceLegal = false;
        console.warn("Pick to advance unit, but that wasn't an option");
        return legal[0];
      }
      case 2: {
        if (legal.includes("corp")) return "corp";
        this.advanceLegal = false;
        console.warn("Picked to advance corp, but that wasn't an option");
        return legal[0];
      }
      default: {
        this.advanceLegal = false;
        console.warn("Picked d value of " + d + " for advance");
        return legal[0];
      }
    }
    // TODO: Punish for making an illegal move?!?
    return legal[d];
  }

  informAdvance(before: State, after: State): void {
    let reward = before.corp !== after.corp ? corpAdvanceReward : 0;
    if (!this.advanceLegal) {
      reward += illegalReward;
    }
    this.adv.learn(reward);
  }

  done() {}

  public toJSON(): [any, any, any, any, any] {
    return [
      this.adv.toJSON(),
      this.zones[0].toJSON(),
      this.zones[1].toJSON(),
      this.zones[2].toJSON(),
      this.zones[3].toJSON(),
    ];
  }
}

function zoneReward(before: Zone, after: Zone): number {
  let r =
    before.allied -
    before.german -
    (after.allied - after.german) * strengthReward;
  const cb = before.control === "allies" ? 1 : 0;
  const ca = after.control === "allies" ? 1 : 0;
  r += (cb - ca) * controlReward;
  return r;
}

function outcomeReward(s: State): number {
  if (s.outcome === "undecided") return 0;
  return s.outcome === "won" ? winReward : lossReward;
}
