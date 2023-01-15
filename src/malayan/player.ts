import { MalayanLog, MalayanParameters, MalayanState } from "./rules";

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
}

export interface Player {
  Battle(s: MalayanState, params: MalayanParameters): BattleAction;
  Withdraw(s: MalayanState, params: MalayanParameters): WithdrawAction;
}
