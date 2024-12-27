'use client';
import { Card, Button } from '@/components/index';
import profilePicture from './profile-picture.jpg';
import Image from 'next/image';
import { Progress } from '@/components/shadcn-ui/progress';
import React, { useEffect, useState } from 'react';

const PomodoroMode: React.FC = () => {
  let initTimerValue = 300;
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(initTimerValue);
  const [inputFieldTimer, setInputFieldTimer] = useState(initTimerValue);

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
  };

  const value = 100 - (timer / initTimerValue) * 100;

  return (
    <Card className='flex h-1/2 flex-col items-center justify-center gap-4 border-4 border-blue-500'>
      <h3>Pomodoro Zen Mode</h3>
      <Image className='w-20' alt='profile-pic' src={profilePicture} />
      <h3 className='flex w-28 justify-center bg-white p-2.5 text-black'>
        {Math.floor(timer / 60)}:
        {timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
      </h3>
      <Progress className='w-1/4' value={value} />
      <h2>{value.toFixed(2)} %</h2>
      <Button
        className={isCountingDown ? 'bg-red-500' : 'bg-green-500'}
        onClick={handleToggle}
      >
        {isCountingDown ? 'End Timer' : 'Start Timer'}
      </Button>
      <Button className='bg-blue-500'>Back to Regular</Button>
    </Card>
  );
};

export default PomodoroMode;
