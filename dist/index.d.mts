import { Ref, UnwrapRef, MaybeRef } from 'vue';

interface UseAsyncStateReturnBase<Data, Params extends any[], Shallow extends boolean> {
    state: Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>>;
    isReady: Ref<boolean>;
    isLoading: Ref<boolean>;
    error: Ref<unknown>;
    execute: (delay?: number, ...args: Params) => Promise<Data | undefined>;
    executeImmediate: (...args: Params) => Promise<Data | undefined>;
}
type UseAsyncStateReturn<Data, Params extends any[], Shallow extends boolean> = UseAsyncStateReturnBase<Data, Params, Shallow> & PromiseLike<UseAsyncStateReturnBase<Data, Params, Shallow>>;
interface UseAsyncStateOptions<Shallow extends boolean, D = any> {
    /**
     * Delay for the first execution of the promise when "immediate" is true. In milliseconds.
     *
     * @default 0
     */
    delay?: number;
    /**
     * Execute the promise right after the function is invoked.
     * Will apply the delay if any.
     *
     * When set to false, you will need to execute it manually.
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * Callback when error is caught.
     */
    onError?: (e: unknown) => void;
    /**
     * Callback when success is caught.
     * @param {D} data
     */
    onSuccess?: (data: D) => void;
    /**
     * Sets the state to initialState before executing the promise.
     *
     * This can be useful when calling the execute function more than once (for
     * example, to refresh data). When set to false, the current state remains
     * unchanged until the promise resolves.
     *
     * @default true
     */
    resetOnExecute?: boolean;
    /**
     * Use shallowRef.
     *
     * @default true
     */
    shallow?: Shallow;
    /**
     *
     * An error is thrown when executing the execute function
     *
     * @default false
     */
    throwError?: boolean;
}
/**
 * Reactive async state. Will not block your setup function and will trigger changes once
 * the promise is ready.
 *
 * @see https://vueuse.org/useAsyncState
 * @param promise         The promise / async function to be resolved
 * @param initialState    The initial state, used until the first evaluation finishes
 * @param options
 */
declare function useAsyncState<Data, Params extends any[] = any[], Shallow extends boolean = true>(promise: Promise<Data> | ((...args: Params) => Promise<Data>), initialState: MaybeRef<Data>, options?: UseAsyncStateOptions<Shallow, Data>): UseAsyncStateReturn<Data, Params, Shallow>;

export { useAsyncState };
export type { UseAsyncStateOptions, UseAsyncStateReturn, UseAsyncStateReturnBase };
