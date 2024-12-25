'use client';
import { Card, Button } from '@/components/index';
import profilePicture from './profile-picture.jpg';
import Image from 'next/image';
import { Progress } from '@/components/shadcn-ui/progress';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const PomodoroMode: React.FC = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(300);
  const [initTimerValue, setInitTimerValue] = useState(300);

  useEffect(() => {
    if (isCountingDown) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setIsCountingDown(false);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountingDown]);

  const handleToggle = () => {
    setIsCountingDown((prev) => !prev);
    if (isCountingDown) {
      setTimer(initTimerValue);
      setInitTimerValue(initTimerValue);
    }
  };

  let value = 100 - (timer / initTimerValue) * 100;

  function handleTime(adjustment: number) {
    setTimer(Math.max(300, Math.min(timer + adjustment, 7200)));
    setInitTimerValue(
      Math.max(300, Math.min(initTimerValue + adjustment, 7200))
    );
  }

  return (
    <Card className='flex h-4/5 flex-col items-start items-center justify-center gap-4 border-4 border-blue-500'>
      <h3>Pomodoro Zen Mode</h3>
      <Image className='w-20' alt='profile-pic' src={profilePicture} />
      <div className='flex gap-4'>
        <Button
          disabled={isCountingDown ? true : false}
          className='h-24 w-24 bg-red-500'
          onClick={() => handleTime(-300)}
        >
          -
        </Button>
        <Button
          disabled={isCountingDown ? true : false}
          className='h-24 w-24 bg-green-500'
          onClick={() => handleTime(+300)}
        >
          +
        </Button>
      </div>
      <h3 className='flex w-28 justify-center bg-white px-20 py-7 text-3xl font-thin tracking-wider text-black'>
        {Math.floor(timer / 60)}:
        {timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
      </h3>
      <div className='flex flex-col gap-y-4'>
        <Progress className='w-96' value={value} />
        <h2 className='2-xl self-center'>{value.toFixed(2)} %</h2>
      </div>
      <Button
        className={isCountingDown ? 'bg-red-500' : 'bg-green-500'}
        onClick={handleToggle}
      >
        {isCountingDown ? 'End Timer' : 'Start Timer'}
      </Button>
      <Button className='bg-blue-500' onClick={() => redirect('./arc-timer')}>
        Back to Regular
      </Button>
    </Card>
  );
};

export default PomodoroMode;
