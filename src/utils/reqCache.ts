// eslint-disable
import md5 from 'blueimp-md5';

// import request, { AppResponseType, OK_CODE } from '@app/utils/request';

const request = (url: string, method: string, params: any, customHeaders: any) => Promise.resolve({});

interface DataType {
  [key: string]: any;
}

let requestPromise: { [key: string]: Promise<any> } = {};

let store: DataType = {};
let userStore: DataType = {};

const isObject = (obj: any) => obj === Object(obj);

export const cacheData = (key: string, data: any, user = true): (() => void) => {
  const _store = user ? userStore : store;
  _store[key] = data;
  return () => delete _store[key];
};

export const getData = (key: string, user = true): any => {
  return user ? userStore[key] : store[key];
};

export const clearCache = (): void => {
  store = {};
  requestPromise = {};
};

export const clearUserCache = (): void => {
  userStore = {};
  requestPromise = {};
};

const getObjStr: (obj: any) => string = (obj) => {
  const keys = Object.keys(obj);
  keys.sort();
  return keys.reduce((s, k) => (s += !isObject(obj[k]) ? `&${k}=${obj[k]}` : '_' + getObjStr(obj[k])), '');
};

export const generateCacheKey = (obj: any): string => {
  return md5(getObjStr(obj));
};

export function requestCache(
  url: string,
  method: string,
  params: any,
  customHeaders: any = {},
  cacheTime: any = 10000,
): Promise<any> {
  const cacheKey = generateCacheKey({ url, method, params });
  let p, d;
  if (cacheTime !== false) {
    if ((d = getData(cacheKey))) {
      return Promise.resolve(d);
    }
    if ((p = requestPromise[cacheKey])) {
      return p;
    }
  }
  p = request(url, method, params, customHeaders);
  requestPromise[cacheKey] = p;
  p.then((rep: any) => {
    if (rep.rspCode === '0000') {
      const clean = cacheData(cacheKey, rep);
      setTimeout(() => {
        clean();
      }, cacheTime);
    }
    delete requestPromise[cacheKey];
    return rep;
  }).catch(() => {
    delete requestPromise[cacheKey];
  });
  return p;
}
