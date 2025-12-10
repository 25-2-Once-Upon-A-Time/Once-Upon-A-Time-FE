import { useSyncExternalStore } from 'react';

export type SetState<TState> = (
  partial: Partial<TState> | ((state: TState) => Partial<TState>),
) => void;
export type GetState<TState> = () => TState;
export type StateCreator<TState> = (set: SetState<TState>, get: GetState<TState>) => TState;

export type StoreApi<TState> = {
  getState: GetState<TState>;
  setState: SetState<TState>;
  subscribe: (listener: () => void) => () => void;
};

export type UseBoundStore<TState> = (<U = TState>(selector?: (state: TState) => U) => U) &
  StoreApi<TState>;

export function create<TState>(creator: StateCreator<TState>): UseBoundStore<TState> {
  let state: TState;
  const listeners = new Set<() => void>();

  const getState: GetState<TState> = () => state;
  const setState: SetState<TState> = (partial) => {
    const nextPartial = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextPartial };
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = creator(setState, getState);

  const useStore = (<U = TState>(selector?: (state: TState) => U) => {
    const selectorFn = selector ?? ((storeState: TState) => storeState as unknown as U);
    return useSyncExternalStore(subscribe, () => selectorFn(getState()));
  }) as UseBoundStore<TState>;

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}
