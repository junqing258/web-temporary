import { handleActions } from 'redux-actions';

import * as ActionType from '../actions/actionTypes';

export type IState = {
  counter: number;
};

export type IAction = {
  payload: any;
};

const defaultState: IState = { counter: 10 };

const appReducer = handleActions(
  {
    [ActionType.INCREMENT]: (state: IState, action: IAction): IState => {
      const {
        payload: { amount },
      } = action;
      return { ...state, counter: state.counter + amount };
    },
    [ActionType.DECREMENT]: (state: IState, action: IAction): IState => {
      const {
        payload: { amount },
      } = action;
      return { ...state, counter: state.counter - amount };
    },
    [ActionType.RESET]: (state: IState, action: IAction): IState => {
      const { payload } = action;
      return { ...state, counter: payload };
    },
  },
  defaultState,
);

export default appReducer;
