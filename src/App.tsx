import "./App.css";
import { GameController } from "./components/game-controller";

export function App() {
  return (
    <div className="App">
      <h1>A Game Too Far, Market Garden, 1944</h1>
      <div className="card">
        <GameController />
      </div>
    </div>
  );
}
