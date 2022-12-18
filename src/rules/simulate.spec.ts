import Prando from "prando";
import { expect, test } from "vitest";
import { gameParameters } from "./parameters";
import { PacifistPlayer } from "./players";
import { simulate } from "./simulate";
import { initial, stringifyEvent } from "./state";

test("should lose as a dummy player", async () => {
  const chance = new Prando(1234);
  const result = await simulate(
    initial,
    new PacifistPlayer(),
    gameParameters,
    chance
  );
  expect(result.final.log.map(stringifyEvent)).toEqual([
    "Initial allied airdrop results: -1, 0, -1",
    "After initial airdrop: C:belgium W:false Z1:A:5 G:2* Z2: A:6 G:2* Z3: A:0 G:1* Z4: A:4 G:2* -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 1, zone 1, roll: 5, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 1, zone 2, roll: 4, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 1, zone 4, roll: 6, Allied losses: 0, German losses: 0, Control: german",
    "After day 1 battles: C:belgium W:false Z1:A:5 G:2* Z2: A:6 G:2* Z3: A:0 G:1* Z4: A:4 G:2* -> undecided",
    "Germans reinforced in all zones",
    "After day 1 advance (nothing): C:belgium W:false Z1:A:5 G:3* Z2: A:6 G:3* Z3: A:0 G:2* Z4: A:4 G:3* -> undecided",
    "Allies rolled a 1 on day 1.  Needed a 6, no airdrop.",
    "Allied unit in zone 1 chooses to defend",
    "day 2, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 2, zone 2, roll: 5, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 2, zone 4, roll: 2, Allied losses: 0, German losses: 0, Control: german",
    "After day 2 battles: C:belgium W:false Z1:A:5 G:3* Z2: A:6 G:3* Z3: A:0 G:2* Z4: A:4 G:3* -> undecided",
    "Germans reinforced in all zones",
    "After day 2 advance (nothing): C:belgium W:false Z1:A:5 G:4* Z2: A:6 G:4* Z3: A:0 G:3* Z4: A:4 G:4* -> undecided",
    "Allies rolled a 5 on day 2.  Needed a 5 so airdrop of 1st Airborne reinforcements succeeded.",
    "Allied unit in zone 1 chooses to defend",
    "day 3, zone 1, roll: 3, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 3, zone 2, roll: 4, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 3, zone 4, roll: 1, Allied losses: -1, German losses: -1, Control: german",
    "After day 3 battles: C:belgium W:true Z1:A:5 G:4* Z2: A:6 G:4* Z3: A:0 G:3* Z4: A:4 G:3* -> undecided",
    "Germans reinforced in all zones",
    "After day 3 advance (nothing): C:belgium W:true Z1:A:5 G:5* Z2: A:6 G:5* Z3: A:0 G:4* Z4: A:4 G:4* -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 4, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 4, zone 2, roll: 3, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 4, zone 4, roll: 2, Allied losses: -1, German losses: -1, Control: german",
    "After day 4 battles: C:belgium W:true Z1:A:5 G:5* Z2: A:6 G:5* Z3: A:0 G:4* Z4: A:3 G:3* -> undecided",
    "Germans reinforced in all zones",
    "After day 4 advance (nothing): C:belgium W:true Z1:A:5 G:6* Z2: A:6 G:6* Z3: A:0 G:5* Z4: A:3 G:4* -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 5, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 5, zone 2, roll: 2, Allied losses: -1, German losses: -1, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 5, zone 4, roll: 5, Allied losses: 0, German losses: 0, Control: german",
    "After day 5 battles: C:belgium W:true Z1:A:5 G:6* Z2: A:5 G:5* Z3: A:0 G:5* Z4: A:3 G:4* -> undecided",
    "Germans reinforced in all zones",
    "After day 5 advance (nothing): C:belgium W:true Z1:A:5 G:6* Z2: A:5 G:6* Z3: A:0 G:6* Z4: A:3 G:5* -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 6, zone 1, roll: 2, Allied losses: -1, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 6, zone 2, roll: 4, Allied losses: -1, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 6, zone 4, roll: 1, Allied losses: -2, German losses: 0, Control: german",
    "After day 6 battles: C:belgium W:true Z1:A:4 G:6* Z2: A:4 G:6* Z3: A:0 G:6* Z4: A:1 G:5* -> undecided",
    "Germans reinforced in all zones",
    "After day 6 advance (nothing): C:belgium W:true Z1:A:4 G:6* Z2: A:4 G:6* Z3: A:0 G:6* Z4: A:1 G:6* -> undecided",
    "Allies were unable to advance to Arnhem in 6 days",
  ]);
  expect(result.final.outcome).toEqual("lost");
  expect(result).not.toBeNull();
});
