'use client';
import React, { useEffect, useReducer } from 'react';
import DisplayForestStatsSection from './DisplayForestStatsSection';
import TimerAndControlsSection from './TimerAndControlsSection';
import { Timer } from '@/types/custom.types';
import { handleGetTimers } from './utils/TimerHandlers';
import { UserTimersContext } from './utils/TimersContext';

type UserTimersContextState = Timer[];
type UserTimersContextActions =
  | { type: 'addUserTimer'; newTimer: Timer }
  | { type: 'initializeUserTimers'; userTimers: Timer[] };

export const timersReducer = (
  state: UserTimersContextState,
  action: UserTimersContextActions
) => {
  switch (action.type) {
    case 'initializeUserTimers': {
      return [...action.userTimers];
    }
    default: {
      console.log(`Reducer action error - state: ${state}`);
      return state;
    }
  }
};

const initialTimers = [] as Timer[];

const Page: React.FC = () => {
  const [timers, dispatch] = useReducer(timersReducer, initialTimers);
  useEffect(() => {
    const initializeTimers = async () => {
      const res = await handleGetTimers();
      const userTimers: Timer[] = JSON.parse(JSON.stringify(res));
      dispatch({ type: 'initializeUserTimers', userTimers });
      return;
    };

    initializeTimers();
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <UserTimersContext.Provider value={timers}>
      <div className='h-screen p-5'>
        <DisplayForestStatsSection />
        <TimerAndControlsSection />
      </div>
    </UserTimersContext.Provider>
  );
};

export default Page;
