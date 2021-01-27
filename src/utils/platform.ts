export const getLoginStatus = (): boolean => {
  return false;
};

export const login = (cb: (info: any) => void): any => {
  window.confirm('login');
};

export const register = (cb: (info: any) => void): any => {
  window.confirm('register');
};
