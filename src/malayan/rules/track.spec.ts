import { describe, expect, it } from "vitest";
import { MalayanLog } from "./log";
import { malayanBase } from "./parameters";
import { clone, loss, undecided } from "./state";
import { trackRound } from "./track";

describe("Test turn track", () => {
  it("should advance turn normally before turn 6", () => {
    const cur = clone(malayanBase.initial);
    const log: MalayanLog = [];
    const next = trackRound(cur, malayanBase, log);
    expect(next.turn).toEqual(2);
    expect(next.outcome).toEqual(undecided);
    expect(log[0].type).toEqual("turn");
    if (log[0].type == "turn") {
      expect(log[0].turn).toEqual(1);
    }
  });
  it("should trigger loss on turn 6", () => {
    const cur = clone(malayanBase.initial);
    cur.turn = 6;
    const log: MalayanLog = [];
    const next = trackRound(cur, malayanBase, log);
    expect(next.turn).toEqual(6);
    expect(next.outcome).toEqual(loss);
    expect(log[0].type).toEqual("outcome");
    if (log[0].type == "outcome") {
      expect(log[0].why).toEqual("Commonwealth ran out of time.");
    }
  });
});
