import Prando from "prando";
import { describe, it } from "vitest";
import { monteCarlo } from "../../../monte/analysis";
import { gameParameters } from "../../parameters";
import { simulate } from "../../simulate";
import { initial } from "../../state";
import { DQNPlayer } from "./player";

describe("Train DQN player", () => {
  it("should learn", async () => {
    const epochs = 90001;
    const update = 100;
    const player = new DQNPlayer(true);
    for (let i = 0; i < epochs; i++) {
      const chance = new Prando(i);

      if (i % update === 0) {
        const student = new DQNPlayer(false, player.toJSON());
        const res = await monteCarlo(
          10000,
          1,
          student,
          initial,
          gameParameters,
          false
        );
        const wins = res.filter((r) => r.final.outcome === "won");
        const winPer = ((100.0 * wins.length) / res.length).toFixed(2);
        console.log(`After ${i} epochs, win rate is ${winPer}`);
      }
      await simulate(initial, player, gameParameters, chance);
    }
  });
});
