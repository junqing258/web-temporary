/* eslint-disable no-sequences */
/* tslint:disable */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * 异步
 */
export const pipeAsyncFunctions = (...fns: any[]) => (arg: any) =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

export const runPromisesInSeries = (ps: any[]) =>
  ps.reduce((p: Promise<any>, next: any) => p.then(next), Promise.resolve());

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const chainAsync = (fns: string | any[]) => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  return next;
};

export const promisify = (func: any) => (...args: any) =>
  new Promise((resolve, reject) => func(...args, (err: any, result: any) => (err ? reject(err) : resolve(result))));

/**
 * 函数
 */
export const compose = (...fns: any[]) => fns.reduce((f, g) => (...args: any) => f(g(...args)));

export const debounce = (fn: { apply: (arg0: any, arg1: any[]) => void }, ms = 0) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const throttle = (fn: Function, threshHold = 250, scope: any) => {
  let last: number, deferTimer: NodeJS.Timeout;
  return function () {
    const context = scope || this;
    const now = +new Date(),
      args = arguments;
    if (last && now < last + threshHold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshHold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

/* Math */
export const randomNumberInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const randomIntegerInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomIntArrayInRange = (min: number, max: number, n = 1) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

export const sumBy = (arr: any[], fn: string | number) =>
  arr
    .map(typeof fn === 'function' ? fn : (val: { [x: string]: any }) => val[fn])
    .reduce((acc: any, val: any) => acc + val, 0);

/** 数组 */
export const difference = (a: any[], b: Iterable<unknown> | null | undefined) => {
  const s = new Set(b);
  return a.filter((x: unknown) => !s.has(x));
};

export const sample = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)];

export const chunk = (arr: string | any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

export const flatten = (arr: any[], depth = 1): any => {
  return arr.reduce(
    (a: string | any[], v: any) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    [],
  );
};

export const remove = (arr: any[], func: (value: any, index: number, array: any[]) => value is any) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

/** 对象 */

/** Type */
export const isNil = (val: null | undefined) => val === undefined || val === null;

export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

export const is = (type: any, val: any) => ![undefined, null].includes(val) && val.constructor === type;

export const isObject = (obj: any) => obj === Object(obj);

export const isPlainObject = (val: { constructor: ObjectConstructor }) =>
  !!val && typeof val === 'object' && val.constructor === Object;

export const getType = (v: { constructor: { name: any } } | null | undefined) =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name;

export const equals = (a: any, b: any): any => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
};

export const deepClone = (obj: any) => {
  if (obj === null) return null;
  const clone = Object.assign({}, obj) as any;
  Object.keys(clone).forEach((key) => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

export const omit = (obj: any, arr: string | string[]): any =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc: any, key: string) => ((acc[key] = obj[key]), acc), {});

export const omitBy = (obj: any, fn: (arg0: any, arg1: string) => any) =>
  Object.keys(obj)
    .filter((k) => !fn(obj[k], k))
    .reduce((acc: any, key) => ((acc[key] = obj[key]), acc), {});

export const pick = (obj: any, arr: any[]) =>
  arr.reduce((acc: any, curr: string) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const pickBy = (obj: any, fn: (arg0: any, arg1: string) => unknown) =>
  Object.keys(obj)
    .filter((k) => fn(obj[k], k))
    .reduce((acc: any, key) => ((acc[key] = obj[key]), acc), {});
