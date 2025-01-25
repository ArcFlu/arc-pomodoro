import React from 'react';
import PomodoroMode from './PomodoroMode';
import PiPMode from './PiPMode';

const Page: React.FC = () => {
  return (
    <div className='inline-flex'>
      <PiPMode>
        <PomodoroMode />
      </PiPMode>
    </div>
  );
};

export default Page;
