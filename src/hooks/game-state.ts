import React from "react";
import { initial, State } from "../rules/state";

export function useGameState() {
  const [state, setState] = React.useState<State>(initial);

  const reset = () => setState(initial);
  return { state, reset, setState };
}
