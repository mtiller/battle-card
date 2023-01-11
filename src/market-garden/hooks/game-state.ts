import React from "react";
import { initial, MarketGardenState } from "../rules/state";

export function useGameState() {
  const [state, setState] = React.useState<MarketGardenState>(initial);

  const reset = () => setState(initial);
  return { state, reset, setState };
}
