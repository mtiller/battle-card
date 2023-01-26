import React from "react";
import { BattleAction, WithdrawAction } from "../player";
import {
  autoActions,
  battleRound,
  malayanBase,
  MalayanLog,
  MalayanParameters,
  MalayanState,
  withdrawRound,
} from "../rules";
import Prando from "prando";
import { legalAdvance } from "../../market-garden/rules";

export interface MalayanGameData {
  state: MalayanState;
  setBattle?: (x: BattleAction) => void;
  setWithdraw?: (x: WithdrawAction) => void;
  log: MalayanLog;
}

export const MalayanGameContext = React.createContext<MalayanGameData>(
  null as any
);

export interface MalayanProviderProps {
  children: React.ReactNode;
}

export const MalayanProvider = (props: MalayanProviderProps) => {
  const [log, setLog] = React.useState<MalayanLog>([]);
  const [params, setParams] = React.useState<MalayanParameters>(malayanBase);
  const [state, setRawState] = React.useState<MalayanState>(params.initial);
  const prando: Prando = React.useMemo(() => {
    console.log("Randomizer seeded");
    return new Prando();
  }, []);

  // Perform first round of auto actions
  React.useEffect(() => {
    if (log.length > 0) return;
    const init = autoActions(params.initial, params, log);
    setRawState(init);
    setLog(log);
  }, []);

  const setState = (x: MalayanState) => {
    console.log("Running any autoActions after setting state to ", x.round);
    const next = autoActions(x, params, log);
    setLog(log);
    setRawState(next);
  };
  const setBattle: ((x: BattleAction) => void) | undefined =
    React.useMemo(() => {
      if (state.round == "battle") {
        return (x: BattleAction) => {
          const next = battleRound(state, prando, params, x, log);
          setLog(log);
          setState(next);
        };
      } else {
        return undefined;
      }
    }, [state, params, log]);

  const setWithdraw: ((x: WithdrawAction) => void) | undefined =
    React.useMemo(() => {
      if (state.round == "withdraw") {
        return (x: WithdrawAction) => {
          const next = withdrawRound(state, params, x, log);
          setLog(log);
          setState(next);
        };
      } else {
        return undefined;
      }
    }, [state, params, log]);

  return (
    <MalayanGameContext.Provider
      value={{
        state,
        setBattle,
        setWithdraw,
        log,
      }}
    >
      {props.children}
    </MalayanGameContext.Provider>
  );
};
