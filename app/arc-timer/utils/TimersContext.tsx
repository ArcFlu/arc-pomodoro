import { Timer } from '@/types/custom.types';
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { handleGetTimers } from './TimerHandlers';

export const UserTimersContext = createContext([] as Timer[]);
export const UserTimersDispatchContext = createContext(
  (() => undefined) as Dispatch<any>
);

type UserTimersContextState = Timer[];
type UserTimersContextActions =
  | { type: 'addUserTimer'; newTimer: Timer }
  | { type: 'initializeUserTimers'; userTimers: Timer[] };

export const userTimersReducer = (
  state: UserTimersContextState,
  action: UserTimersContextActions
) => {
  switch (action.type) {
    case 'addUserTimer': {
      return [...state, action.newTimer];
    }
    case 'initializeUserTimers': {
      return [...action.userTimers];
    }
    default: {
      console.log(`UserTimersReducer error - state: ${state}`);
      return state;
    }
  }
};

const initialTimers = [] as Timer[];

interface UserTimersProviderProps {
  children: ReactNode;
}

export const UserTimersProvider = ({ children }: UserTimersProviderProps) => {
  const [timers, dispatch] = useReducer(userTimersReducer, initialTimers);
  useEffect(() => {
    const initializeTimers = async () => {
      const res = await handleGetTimers();
      const userTimers: Timer[] = res;
      dispatch({ type: 'initializeUserTimers', userTimers });
      return;
    };

    initializeTimers();
  }, []);
  return (
    <UserTimersContext.Provider value={timers}>
      <UserTimersDispatchContext.Provider value={dispatch}>
        {children}
      </UserTimersDispatchContext.Provider>
    </UserTimersContext.Provider>
  );
};

export const ActiveTimerContext = createContext({});
