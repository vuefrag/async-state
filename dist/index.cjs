'use strict';

const vueUseUntil = require('vue-use-until');
const vue = require('vue');

const noop = () => {
};
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function useAsyncState(promise, initialState, options) {
  const {
    immediate = true,
    delay = 0,
    onError = globalThis.reportError ?? noop,
    onSuccess = noop,
    resetOnExecute = true,
    shallow = true,
    throwError
  } = options ?? {};
  const state = shallow ? vue.shallowRef(initialState) : vue.ref(initialState);
  const isReady = vue.shallowRef(false);
  const isLoading = vue.shallowRef(false);
  const error = vue.shallowRef(void 0);
  let executionsCount = 0;
  async function execute(delay2 = 0, ...args) {
    const executionId = executionsCount += 1;
    if (resetOnExecute)
      state.value = vue.toValue(initialState);
    error.value = void 0;
    isReady.value = false;
    isLoading.value = true;
    if (delay2 > 0)
      await promiseTimeout(delay2);
    const _promise = typeof promise === "function" ? promise(...args) : promise;
    try {
      const data = await _promise;
      if (executionId === executionsCount) {
        state.value = data;
        isReady.value = true;
      }
      onSuccess(data);
      return data;
    } catch (e) {
      if (executionId === executionsCount)
        error.value = e;
      onError(e);
      if (throwError)
        throw e;
    } finally {
      if (executionId === executionsCount)
        isLoading.value = false;
    }
  }
  if (immediate) {
    execute(delay);
  }
  const shell = {
    state,
    isReady,
    isLoading,
    error,
    execute,
    executeImmediate: (...args) => execute(0, ...args)
  };
  function waitUntilIsLoaded() {
    return new Promise((resolve, reject) => {
      vueUseUntil.until(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
    });
  }
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilIsLoaded().then(onFulfilled, onRejected);
    }
  };
}

exports.useAsyncState = useAsyncState;
