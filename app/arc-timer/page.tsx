'use client';
import React, { useEffect } from 'react';
import DisplayForestStatsSection from './DisplayForestStatsSection';
import TimerAndControlsSection from './TimerAndControlsSection';
import PomodoroMode from './Pomodoro-Mode';

const Page: React.FC = () => {
  useEffect(() => {
    window.onbeforeunload = () => true;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className='h-screen p-5'>
      <DisplayForestStatsSection />
      <TimerAndControlsSection />
      <PomodoroMode />
    </div>
  );
};

export default Page;
