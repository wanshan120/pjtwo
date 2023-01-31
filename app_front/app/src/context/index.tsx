/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { IUser } from 'models/i-user';
// import {useLocalStarage} from 'hooks/useLocalStrage'

type State = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

type StateContextProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  console.log(value);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
