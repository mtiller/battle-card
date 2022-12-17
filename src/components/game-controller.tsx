import { useGameState } from "../hooks/game-state";

export interface GameControllerProps {}

export const GameController = (props: GameControllerProps) => {
  const { state } = useGameState();
  return (
    <div>
      <h2>Day: {state.day}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <h4>Zone 4</h4>
            <div
              style={{
                width: "60vw",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Allies: {state.zones[3].allied}</div>
              <div>Germans: {state.zones[3].german}</div>
            </div>
          </div>
          <div>
            <h4>Zone 3</h4>
            <div
              style={{
                width: "60vw",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Allies: {state.zones[2].allied}</div>
              <div>Germans: {state.zones[2].german}</div>
            </div>
          </div>
          <div>
            <h4>Zone 2</h4>
            <div
              style={{
                width: "60vw",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Allies: {state.zones[1].allied}</div>
              <div>Germans: {state.zones[1].german}</div>
            </div>
          </div>
          <div>
            <h4>Zone 1</h4>
            <div
              style={{
                width: "60vw",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>Allies: {state.zones[0].allied}</div>
              <div>Germans: {state.zones[0].german}</div>
            </div>
          </div>
          <div>
            <h4>Belgium</h4>
          </div>
        </div>
        <div>
          <h2>Log</h2>
          <pre>{state.log.join("\n")}</pre>
        </div>
      </div>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};
