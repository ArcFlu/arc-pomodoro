'use client';
import React, { useEffect, useState } from 'react';
import ArcPomodoroIcon from '../../../public/ArcPomodoroIcon.webp';
import { Button } from '@mui/material';

const initTime = 10;

const Timer = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLParagraphElement> &
    React.HTMLAttributes<HTMLParagraphElement>
) => {
  const [timeInSeconds, setTimeInSeconds] = useState(initTime);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInSeconds((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          setOpacity(newTime / initTime); // Calculate opacity based on remaining time
          return newTime;
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeInSeconds]);

  return (
    <div className='justify-items-center'>
      <img
        src={ArcPomodoroIcon.src}
        className='h-1/3 w-1/3'
        style={{ opacity }}
      />
      {timeInSeconds > 0 ? (
        <p {...props}>{timeInSeconds}</p>
      ) : (
        <>
          <p {...props}>TIME IS UP!!! </p>
          <Button className='bg-pink-600 text-slate-300'>
            Click Here to Reset
            <br />
            jk someone please implement this
          </Button>
        </>
      )}
    </div>
  );
};

export default Timer;
