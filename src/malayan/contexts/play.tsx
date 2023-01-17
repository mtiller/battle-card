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
  const init = autoActions(params.initial, params, log);
  const [state, setRawState] = React.useState<MalayanState>(init);
  const prando = new Prando(0);

  React.useEffect(() => setLog(log));

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
