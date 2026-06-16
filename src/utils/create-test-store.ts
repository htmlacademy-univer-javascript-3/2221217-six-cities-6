import { configureStore } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { reducer, State } from '../store/root-reducer';

export function createTestStore(
  preloadedState?: Partial<State>,
  api: AxiosInstance = axios.create(),
) {
  return configureStore({
    reducer,
    preloadedState: preloadedState as State,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
}
