// flow-typed signature: b73ae46c91c53b714aafebd7e0653ecc
// flow-typed version: 550abd5830/signals_v1.x.x/flow_>=v0.28.x

// Modified by Ole Christian Eidheim, 2018/03/10

declare module 'signals' {
  declare class SignalBinding<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void> {
    active: boolean;
    context: ?mixed;
    params: ?(mixed[]);
    constructor(signal: Signal<T1, T2, T3, T4, T5, T6, T7>, listener: () => void, isOnce: boolean, listenerContext: ?mixed, priority: ?number): void;
    detach(): ?() => void;
    execute(paramsArr: ?(mixed[])): mixed;
    getListener(): () => void;
    getSignal(): Signal<T1, T2, T3, T4, T5, T6, T7>;
    isBound(): boolean;
    isOnce(): boolean;
    toString(): string;
  }
  declare class Signal<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void> {
    active: boolean;
    memorize: boolean;
    VERSION: string;
    constructor(): void;
    add(listener: (T1, T2, T3, T4, T5, T6, T7) => void, listenerContext: ?mixed, priority: ?number): SignalBinding<T1, T2, T3, T4, T5, T6, T7>;
    addOnce(listener: (T1, T2, T3, T4, T5, T6, T7) => void, listenerContext: ?mixed, priority: ?number): SignalBinding<T1, T2, T3, T4, T5, T6, T7>;
    dispatch(T1, T2, T3, T4, T5, T6, T7): void;
    dispose(): void;
    forget(): void;
    getNumListeners(): number;
    halt(): void;
    has(listener: (T1, T2, T3, T4, T5, T6, T7) => void, context: ?mixed): boolean;
    remove(listener: (T1, T2, T3, T4, T5, T6, T7) => void, context: ?mixed): () => void;
    removeAll(): void;
    toString(): string;
  }

  declare export default typeof Signal
}
