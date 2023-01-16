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
  log: MalayanLog;
}

export const MalayanGameContext = React.createContext<MalayanGameData>(
  null as any
);

export interface MalayanProviderProps {
  children: React.ReactNode;
}

export const MalayanProvider = (props: MalayanProviderProps) => {
  const [params, setParams] = React.useState<MalayanParameters>(malayanBase);
  const [state, setRawState] = React.useState<MalayanState>(params.initial);
  const [log, setLog] = React.useState<MalayanLog>([]);
  const prando = new Prando();

  const setState = (x: MalayanState) => {
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
        log,
      }}
    >
      {props.children}
    </MalayanGameContext.Provider>
  );
};
