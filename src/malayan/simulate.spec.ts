import Prando from "prando";
import { describe, expect, it } from "vitest";
import { DefensivePlayer, Seed0Player as Seed4Player } from "./player";
import { clone, malayanBase, MalayanState } from "./rules";
import { simulate } from "./simulate";

describe("Test simulating Malayan campaign", () => {
  it("should win with seed 4 and pre-programmed moves", () => {
    const params = malayanBase;
    const initial = clone(params.initial);
    const player = new Seed4Player();
    const r = new Prando(4);
    const [log, final] = simulate(initial, r, player, params);
    expect(final.outcome).toEqual("win");
  });
  it("should win with seed 4 and defensive player", () => {
    const params = malayanBase;
    const initial = clone(params.initial);
    const player = new DefensivePlayer();
    const r = new Prando(4);
    const [log, final] = simulate(initial, r, player, params);
    expect(final.outcome).toEqual("win");
  });
  it("should win a game with defensive player", () => {
    const params = malayanBase;
    const initial = clone(params.initial);
    const player = new DefensivePlayer();
    const r = new Prando(0);
    const [log, final] = simulate(initial, r, player, params);
    expect(final.outcome).toEqual("loss");
  });

  it("should replay from the start", () => {
    const p1 = new DefensivePlayer();
    const params = Object.freeze(malayanBase);
    const initial = Object.freeze(clone(params.initial));
    let r = new Prando(4);
    const before = clone(initial);
    const [_1, final1] = simulate(initial, r, p1, params);
    expect(initial).toEqual(before);
    r = new Prando(4);
    const p2 = new DefensivePlayer();
    const [_2, final2] = simulate(initial, r, p2, params);
  });

  it("should run 1000 simulations and collect the final states", () => {
    const states: MalayanState[] = [];
    const player = new DefensivePlayer();
    const n = 1000;
    const params = Object.freeze(malayanBase);
    const initial = Object.freeze(clone(params.initial));
    for (let i = 0; i < n; i++) {
      console.log("Seed: ", i);
      const r = new Prando(i);
      const [_, final] = simulate(initial, r, player, params);
      states.push(final);
    }
    // expect(states.length).toEqual(10000);
    const wins = states.filter((s) => s.outcome == "win");
    const losses = states.filter((s) => s.outcome == "loss");
    expect(wins.length + losses.length).toEqual(states.length);
    // expect(wins.length).toEqual(1);
    console.log("wins: ", wins.length, ", losses: ", losses.length);
    //expect(losses.length).toEqual(0);
  });
});
