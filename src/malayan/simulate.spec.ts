import Prando from "prando";
import { describe, expect, it } from "vitest";
import { DefensivePlayer, Seed0Player as Seed4Player } from "./player";
import { clone, malayanBase, MalayanState } from "./rules";
import { simulate } from "./simulate";

describe("Test simulating Malayan campaign", () => {
  it("should win with seed 0 and pre-programmed moves", () => {
    const params = malayanBase;
    const initial = clone(params.initial);
    const player = new Seed4Player();
    const r = new Prando(4);
    const [log, final] = simulate(initial, r, player, params);
    expect(final.outcome).toEqual("win");
  });
  it.skip("should win a game with defensive player", () => {
    const params = malayanBase;
    const initial = clone(params.initial);
    const player = new DefensivePlayer();
    const r = new Prando(0);
    const [log, final] = simulate(initial, r, player, params);
    expect(final.outcome).toEqual("win");
  });

  it.skip("should run 1000 simulations and collect the final states", () => {
    const states: MalayanState[] = [];
    for (let i = 0; i < 10000; i++) {
      const params = malayanBase;
      const initial = clone(params.initial);
      const player = new DefensivePlayer();
      const r = new Prando(i);
      const [_, final] = simulate(initial, r, player, params);
      states.push(final);
    }
    expect(states.length).toEqual(10000);
    const wins = states.filter((s) => s.outcome == "win");
    const losses = states.filter((s) => s.outcome == "loss");
    expect(wins.length + losses.length).toEqual(states.length);
    expect(wins.length).toEqual(0);
    expect(losses.length).toEqual(0);
  });
});
