import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../saga';
import { PreloadedStateType } from './type';

const configStore = (preloadedState: PreloadedStateType): Store<any, any> => {
  // 创建saga中间件
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  sagaMiddleware.run(rootSaga);

  return store;
};

export { configStore as default };
