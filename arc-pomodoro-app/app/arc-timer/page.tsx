import React from 'react';
import DisplayForestStatsSection from './DisplayForestStatsSection';
import TimerAndControlsSection from './TimerAndControlsSection';

const Page: React.FC = () => {
  return (
    <div className='h-screen p-5'>
      <DisplayForestStatsSection />
      <TimerAndControlsSection />
    </div>
  );
};

export default Page;
