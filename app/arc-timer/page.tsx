'use client';
import React, { useEffect } from 'react';
import DisplayForestStatsSection from './DisplayForestStatsSection';
import TimerAndControlsSection from './TimerAndControlsSection';
import { UserTimersProvider } from './utils/TimersContext';

const Page: React.FC = () => {
  useEffect(() => {
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <UserTimersProvider>
      <div className='h-screen p-5'>
        <DisplayForestStatsSection />
        <TimerAndControlsSection />
      </div>
    </UserTimersProvider>
  );
};

export default Page;
