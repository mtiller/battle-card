import {
  battleOptions,
  MalayanParameters,
  MalayanState,
  withdrawOptions,
} from "./rules";

export type BattleDecision = "attack" | "defend" | null;
export type BattleAction = [
  BattleDecision,
  BattleDecision,
  BattleDecision,
  BattleDecision,
  BattleDecision,
  BattleDecision,
  BattleDecision
];

export type WithdrawDecision = number | null;
export interface WithdrawAction {
  trunk: WithdrawDecision;
  eastern: WithdrawDecision;
  singapore: boolean;
}

export interface Player {
  battle(s: MalayanState, params: MalayanParameters): BattleAction;
  withdraw(s: MalayanState, params: MalayanParameters): WithdrawAction;
}

export class DefensivePlayer implements Player {
  battle(s: MalayanState, params: MalayanParameters): BattleAction {
    const options = battleOptions(s);
    const ret = options.map((x) => (x ? "defend" : null)) as BattleAction;
    console.log(`turn ${s.turn}, battle: `, ret);
    return ret;
  }
  withdraw(s: MalayanState, params: MalayanParameters): WithdrawAction {
    if (s.turn == 2 || s.turn == 4) {
      const ret = { eastern: null, trunk: null, singapore: false };
      console.log(`turn ${s.turn}, withdraw: `, ret);
      return ret;
    }
    const options = withdrawOptions(s);
    const emin = options.eastern.reduce((v, p) => (p < v ? p : v), 10);
    const tmin = options.trunk.reduce((v, p) => (p < v ? p : v), 10);
    const ret = {
      eastern: emin == 10 ? null : emin == 5 ? null : emin,
      trunk: tmin == 10 ? null : tmin,
      singapore: false,
    };
    console.log(`turn ${s.turn}, withdraw: `, ret);
    return ret;
  }
}

export class Seed0Player implements Player {
  battle(s: MalayanState, params: MalayanParameters): BattleAction {
    switch (s.turn) {
      case 1: {
        return ["defend", "defend", null, null, null, null, null];
      }
      case 2: {
        return [null, null, "defend", "defend", null, null, null];
      }
      case 3: {
        return [null, null, "defend", "defend", null, null, null];
      }
      case 4: {
        return [null, null, null, null, "defend", "defend", null];
      }
      case 5: {
        return [null, null, null, null, "defend", "defend", null];
      }
      default: {
        return [null, null, null, null, null, "defend", "defend"];
      }
    }
  }
  withdraw(s: MalayanState, params: MalayanParameters): WithdrawAction {
    switch (s.turn) {
      case 1: {
        return { eastern: 1, trunk: 0, singapore: false };
      }
      case 2: {
        return { eastern: null, trunk: null, singapore: false };
      }
      case 3: {
        return { eastern: 3, trunk: 2, singapore: false };
      }
      case 4: {
        return { eastern: null, trunk: null, singapore: false };
      }
      case 5: {
        return { eastern: null, trunk: 4, singapore: false };
      }
      default: {
        return { eastern: null, trunk: null, singapore: false };
      }
    }
  }
}
