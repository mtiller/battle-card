import React from "react";

export function usePromise<T>() {
  const [pending, setPending] = React.useState<boolean>(false);
  const [res, setResolve] = React.useState<null | ((v: T) => void)>(null);
  const [rej, setReject] = React.useState<null | ((err: Error) => void)>(null);
  const [promise, setPromise] = React.useState<null | Promise<T>>(null);
  const activate = () => {
    if (pending) {
      console.warn("Tried to active promise while one was pending");
      return;
    }
    setPending(true);
    setPromise(
      new Promise<T>((resolve, reject) => {
        setResolve(resolve);
        setReject(reject);
      })
    );
  };
  const reset = () => {
    setPending(false);
    if (rej) {
      rej(new Error("Reset requested"));
    }
    setResolve(null);
    setReject(null);
    setPromise(null);
  };

  return {
    resolve: (v: T) => {
      if (res) {
        res(v);
        setPending(false);
      } else {
        console.warn("Tried to resolve a promise while none was pending");
      }
    },
    reject: (err: Error) => {
      if (rej) {
        rej(err);
        setPending(false);
      } else {
        console.warn("Tried to reject a promise while none was pending");
      }
    },
    promise,
    activate,
    reset,
  };
}
