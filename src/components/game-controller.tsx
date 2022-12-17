import React from "react";
import { useChance } from "../hooks/chance";
import { useGameState } from "../hooks/game-state";
import { usePlayer } from "../hooks/player";
import { AllBattleDecisions, BattleOptions } from "../rules/moves";
import { gameParameters } from "../rules/parameters";
import { simulate } from "../rules/simulate";
import { RadioButton } from "./radio";
import { ZoneStatus } from "./zone-status";

export interface GameControllerProps {}

export const GameController = (props: GameControllerProps) => {
  const chance = useChance(1000);
  const { state, setState } = useGameState();
  const { player, zones, advance, count, reset } = usePlayer(setState);
  const [decisions, setDecisions] = React.useState<AllBattleDecisions>([
    "na",
    "na",
    "na",
    "na",
  ]);

  React.useEffect(() => {
    try {
      simulate(state, player, gameParameters, chance);
    } catch (e: any) {
      console.error(e);
    }
  }, [count]);
  return (
    <div>
      <h2>Day: {state.day}</h2>
      <h3>Weather: {state.dropped ? "Clear" : "Cloudy"}</h3>
      <h3>Battle: {state.outcome}</h3>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <h4>Zone 4</h4>
            {zones && (
              <RadioButton
                options={zones[3]}
                selected={null}
                setSelected={(x: BattleOptions | null) => {
                  if (x !== null)
                    setDecisions([decisions[0], decisions[1], decisions[2], x]);
                }}
              />
            )}
            <ZoneStatus zone={state.zones[3]} corp={state.corp === "zone4"} />
          </div>
          <div>
            <h4>Zone 3</h4>
            <ZoneStatus zone={state.zones[2]} corp={state.corp === "zone4"} />
            {zones && <span>Attack or Defend</span>}
          </div>
          <div>
            <h4>Zone 2</h4>
            <ZoneStatus zone={state.zones[1]} corp={state.corp === "zone4"} />
            {zones && <span>Attack or Defend</span>}
          </div>
          <div>
            <h4>Zone 1</h4>
            <ZoneStatus zone={state.zones[0]} corp={state.corp === "zone4"} />
            {zones && <span>Attack or Defend</span>}
          </div>
          <div>
            <h4>Belgium</h4>
            {state.corp === "belgium" && (
              <span style={{ color: "blue" }}>30th Corp</span>
            )}
          </div>
          <button onClick={reset}>Reset</button>
        </div>
        <div>
          <h2>Log</h2>
          <pre>{state.log.join("\n")}</pre>
        </div>
      </div>
    </div>
  );
};
