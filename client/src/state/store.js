// store.js
import React, {createContext, useReducer} from 'react';
import { reducer } from './reducer'

const initialState = {
  status: false,
  tournament: undefined
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }