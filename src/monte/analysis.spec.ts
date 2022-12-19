import { expect, test } from "vitest";
import { stringifyEvent } from "../rules/events";
import { StrategicPlayer } from "../rules/players";
import { monteCarlo } from "./analysis";

test("Run Monte-Carlo analysis", async () => {
  const n = 10000;
  const player = new StrategicPlayer();

  const results = await monteCarlo(n, 1234, player);
  expect(results.length).toEqual(n);
  const won = results.filter((r) => r.final.outcome === "won").length;
  const loss = results.filter((r) => r.final.outcome === "lost").length;
  const day4 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 4
  ).length;
  const day5 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 5
  ).length;
  const day6 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 6
  ).length;
  console.log(`win = ${(won * 100) / n}%, loss = ${(loss * 100) / n}`);

  const failControl = results.filter(
    (r) => r.history[0].afterBattle.zones[0].control === "german"
  );
  const stillWin = failControl.filter((r) => r.final.outcome === "won").length;
  expect(failControl.length).toEqual(1666);
  expect(stillWin).toEqual(7);
  expect(won + loss).toEqual(n);
  expect(won).toEqual(1930);
  expect(loss).toEqual(8070);
  expect(day4).toEqual(0);
  expect(day5).toEqual(639);
  expect(day6).toEqual(1291);
  expect(results[0].final.log.map(stringifyEvent)).toEqual([
    "Initial allied airdrop results: -1, 0, -1",
    "After initial airdrop: C:belgium W:false Z1:A:5 G:2* Z2: A:6 G:2* Z3: A:0 G:1* Z4: A:4 G:2* -> undecided",
    "Allied unit in zone 1 chooses to attack",
    "day 1, zone 1, roll: 5, Allied losses: 0, German losses: -1, Allies seize control",
    "Allied unit in zone 2 chooses to attack",
    "day 1, zone 2, roll: 4, Allied losses: -1, German losses: -1, Allies seize control",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to attack",
    "day 1, zone 4, roll: 6, Allied losses: 0, German losses: -1, Allies seize control",
    "After day 1 battles: C:belgium W:false Z1:A:5* G:1 Z2: A:5* G:1 Z3: A:0 G:1* Z4: A:4* G:1 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 1",
    "After day 1 advance (corp): C:zone1 W:false Z1:A:5* G:0 Z2: A:5* G:2 Z3: A:0 G:1* Z4: A:4* G:2 -> undecided",
    "Allies rolled a 1 on day 1.  Needed a 6, no airdrop.",
    "No battle in zone 1, no Allied units",
    "Allied unit in zone 2 chooses to defend",
    "day 2, zone 2, roll: 6, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 2, zone 4, roll: 5, Allied losses: 0, German losses: 0, Control: allies",
    "After day 2 battles: C:zone1 W:false Z1:A:5* G:0 Z2: A:5* G:2 Z3: A:0 G:1* Z4: A:4* G:2 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 2",
    "After day 2 advance (corp): C:zone2 W:false Z1:A:5* G:1 Z2: A:5* G:0 Z3: A:0 G:1* Z4: A:4* G:3 -> undecided",
    "Allies rolled a 2 on day 2.  Needed a 5, no airdrop.",
    "Allied unit in zone 1 chooses to defend",
    "day 3, zone 1, roll: 5, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 2, no Allied units",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 3, zone 4, roll: 3, Allied losses: 0, German losses: 0, Control: allies",
    "After day 3 battles: C:zone2 W:false Z1:A:5* G:1 Z2: A:5* G:0 Z3: A:0 G:1* Z4: A:4* G:3 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "After day 3 advance (unit): C:zone2 W:false Z1:A:5* G:2 Z2: A:0* G:1 Z3: A:5 G:1* Z4: A:4* G:4 -> undecided",
    "Allies rolled a 4 on day 3.  Needed a 4 so airdrop of 1st Airborne reinforcements succeeded.",
    "Allied unit in zone 1 chooses to defend",
    "day 4, zone 1, roll: 1, Allied losses: -1, German losses: -1, Control: allies",
    "No battle in zone 2, no Allied units",
    "Allied unit in zone 3 chooses to attack",
    "day 4, zone 3, roll: 6, Allied losses: 0, German losses: -1, Allies seize control",
    "Allied unit in zone 4 chooses to defend",
    "day 4, zone 4, roll: 3, Allied losses: 0, German losses: 0, Control: allies",
    "After day 4 battles: C:zone2 W:true Z1:A:4* G:1 Z2: A:0* G:1 Z3: A:5* G:1 Z4: A:5* G:4 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 3",
    "After day 4 advance (corp): C:zone3 W:true Z1:A:4* G:2 Z2: A:0 G:2* Z3: A:5* G:0 Z4: A:5* G:5 -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 5, zone 1, roll: 2, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 2, no Allied units",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 5, zone 4, roll: 6, Allied losses: 0, German losses: 0, Control: allies",
    "After day 5 battles: C:zone3 W:true Z1:A:4* G:2 Z2: A:0 G:2* Z3: A:5* G:0 Z4: A:5* G:5 -> undecided",
    "Germans reinforced in all zones",
    "After day 5 advance (unit): C:zone3 W:true Z1:A:4* G:3 Z2: A:0 G:3* Z3: A:0* G:1 Z4: A:6 G:6* -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 6, zone 1, roll: 2, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 2, no Allied units",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to attack",
    "day 6, zone 4, roll: 5, Allied losses: -1, German losses: -1, Allies seize control",
    "After day 6 battles: C:zone3 W:true Z1:A:4* G:3 Z2: A:0 G:3* Z3: A:0* G:1 Z4: A:5* G:5 -> undecided",
    "Germans reinforced in all zones",
    "After day 6 advance (nothing): C:zone3 W:true Z1:A:4* G:4 Z2: A:0 G:4* Z3: A:0 G:2* Z4: A:5 G:6* -> undecided",
    "Allies were unable to advance to Arnhem in 6 days",
  ]);
});

test("Run large Monte-Carlo analysis", async () => {
  const n = 1000000;
  const player = new StrategicPlayer();

  const results = await monteCarlo(n, 1234, player, false);
  expect(results.length).toEqual(n);
  const won = results.filter((r) => r.final.outcome === "won").length;
  const loss = results.filter((r) => r.final.outcome === "lost").length;
  console.log(`win = ${(won * 100) / n}%, loss = ${(loss * 100) / n}`);
  expect(won / n).toBeGreaterThan(0.18);
  expect(won / n).toBeLessThan(0.19);
});
