export type ValueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
export const keyMirror = function <T extends Object>(obj: T): T {
  const ret: any = {};
  let key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = key;
    }
  }
  return ret as T;
};
