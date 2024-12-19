import React from 'react';
import DisplayForestStatsSection from './DisplayForestStatsSection';
import TimerAndControlsSection from './TimerAndControlsSection';
import PomodoroMode from './Pomodoro-Mode';

const Page: React.FC = () => {
  return (
    <div className='h-screen p-5'>
      <DisplayForestStatsSection />
      <TimerAndControlsSection />
      <PomodoroMode />
    </div>
  );
};

export default Page;
