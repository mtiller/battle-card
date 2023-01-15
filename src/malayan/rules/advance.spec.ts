import { describe, expect, it } from "vitest";
import { advanceRound } from "./advance";
import { MalayanLog } from "./log";
import { malayanParameters } from "./parameters";
import { clone } from "./state";

describe("Test advancing", () => {
  it("should not advance given initial conditions", () => {
    const cur = clone(malayanParameters.initial);
    const log: MalayanLog = [];
    advanceRound(cur, log);
    expect(log[0].type == "advance");
    if (log[0].type == "advance") {
      expect(log[0].areas).toEqual("nowhere");
    }
  });
  it("should advance and reinforce", () => {
    const cur = clone(malayanParameters.initial);
    const log: MalayanLog = [];
    cur.locations[0].opponent = 2;
    cur.locations[0].player = 0;
    const next = advanceRound(cur, log);
    expect(log[0].type == "advance");
    if (log[0].type == "advance") {
      expect(log[0].areas).toEqual("Kampar");
    }
    expect(next.locations[0].opponent).toEqual(0);
    expect(next.locations[2].opponent).toEqual(4);
  });
});
