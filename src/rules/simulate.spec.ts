import Prando from "prando";
import { expect, test } from "vitest";
import { gameParameters } from "./parameters";
import { PacifistPlayer } from "./players";
import { simulate } from "./simulate";
import { initial } from "./state";

test("should lose as a dummy player", async () => {
  const chance = new Prando(1234);
  const result = await simulate(
    initial,
    new PacifistPlayer(),
    gameParameters,
    chance
  );
  expect(result.final.log).toEqual([
    "Initial allied airdrop results: -1, 0, -1",
    "Allied unit in zone 1 chooses to defend",
    "day 1, zone 1, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 1, zone 2, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 1, zone 4, Allied losses: 0, German losses: 0, Control: german",
    "Germans reinforced in all zones",
    "Allies rolled a 1 on day 1.  Needed a 6, no airdrop.",
    "Allied unit in zone 1 chooses to defend",
    "day 2, zone 1, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 2, zone 2, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 2, zone 4, Allied losses: 0, German losses: 0, Control: german",
    "Germans reinforced in all zones",
    "Allies rolled a 5 on day 2.  Needed a 5 so airdrop of 1st Airborne reinforcements succeeded.",
    "Allied unit in zone 1 chooses to defend",
    "day 3, zone 1, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 3, zone 2, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 3, zone 4, Allied losses: -1, German losses: -1, Control: german",
    "Germans reinforced in all zones",
    "Allied unit in zone 1 chooses to defend",
    "day 4, zone 1, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 4, zone 2, Allied losses: 0, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 4, zone 4, Allied losses: -1, German losses: -1, Control: german",
    "Germans reinforced in all zones",
    "Allied unit in zone 1 chooses to defend",
    "day 5, zone 1, Allied losses: 0, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 5, zone 2, Allied losses: -1, German losses: -1, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 5, zone 4, Allied losses: 0, German losses: 0, Control: german",
    "Germans reinforced in all zones",
    "Allied unit in zone 1 chooses to defend",
    "day 6, zone 1, Allied losses: -1, German losses: 0, Control: german",
    "Allied unit in zone 2 chooses to defend",
    "day 6, zone 2, Allied losses: -1, German losses: 0, Control: german",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 6, zone 4, Allied losses: -2, German losses: 0, Control: german",
    "Germans reinforced in all zones",
  ]);
  expect(result.final.outcome).toEqual("lost");
  expect(result).not.toBeNull();
});
