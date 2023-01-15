import { describe, expect, it } from "vitest";
import { controlRound } from "./control";
import { MalayanLog } from "./log";
import { malayanParameters } from "./parameters";
import { clone } from "./state";

describe("Test control action", () => {
  it("should log no control change for initial conditions", () => {
    const log: MalayanLog = [];
    controlRound(malayanParameters.initial, log);
    expect(log[0].area).toEqual("nothing");
  });
  it("should take control of A1 and A3", () => {
    const cur = clone(malayanParameters.initial);
    cur.locations[0].player = 0;
    cur.locations[1].player = 0;
    cur.locations[4].player = 0;
    cur.locations[5].player = 0;
    const log: MalayanLog = [];
    controlRound(cur, log);
    expect(log[0].area).toEqual("A1 and A3");
  });
});
