// noinspection JSUnresolvedVariable
/**
 * 空闲时段内调用的函数, 启动调度函数
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API
 * @type {function(*): number}
 */

declare const window: any;

const requestIdleCallback = (window.requestIdleCallback =
  window.requestIdleCallback ||
  function (handler: any) {
    const startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  });

// noinspection JSUnresolvedVariable
/**
 * 空闲时段内调用的函数, 取消调度函数
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * @type {function(*): number}
 */
const cancelIdleCallback = (window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id: NodeJS.Timeout) {
    clearTimeout(id);
  });

/**
 * 空闲时段内调用的函数, 启动调度函数
 * e.g.
 * await requestIdlePromise().promise
 *
 * @returns {{cancel: cancel, promise: Promise<any>}}
 */
const requestIdlePromise = (options: any) => {
  let requestIdleCallbackHook: void;

  return {
    promise: new Promise((resolve) => {
      requestIdleCallbackHook = window.requestIdleCallback(resolve, options);
    }),
    cancel: () => {
      cancelIdleCallback(requestIdleCallbackHook);
    },
  };
};

export { requestIdleCallback, cancelIdleCallback, requestIdlePromise };
