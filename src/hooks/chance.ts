import Prando from "prando";
import React from "react";

export function useChance(seed: number): Prando {
  return React.useMemo(() => {
    return new Prando(seed);
  }, []);
}
