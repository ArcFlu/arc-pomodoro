'use client';
import { Card, Button } from '@/components/index';
import profilePicture from './profile-picture.jpg';
import Image from 'next/image';
import { Progress } from '@/components/shadcn-ui/progress';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/shadcn-ui/dialog';

const PomodoroMode: React.FC = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(300);
  const [initTimerValue, setInitTimerValue] = useState(300);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isCountingDown) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setIsCountingDown(false);
            setTimer(initTimerValue);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountingDown]);

  const handleToggle = () => {
    if (isCountingDown) {
      setOpen(true);
    } else {
      setIsCountingDown((prev) => !prev);
    }
  };

  let value = 100 - (timer / initTimerValue) * 100;

  function handleTime(adjustment: number) {
    setTimer(Math.max(300, Math.min(timer + adjustment, 7200)));
    setInitTimerValue(
      Math.max(300, Math.min(initTimerValue + adjustment, 7200))
    );
  }

  {
    /*If press Yes to End Timer on the Dialog Box run this */
  }
  function endTimer() {
    setOpen(false);
    setTimer(initTimerValue);
    setInitTimerValue(initTimerValue);
    setIsCountingDown(false);
  }

  {
    /*If press No to End Timer on the Dialog Box run this */
  }
  function continueTimer() {
    setOpen(false);
    setIsCountingDown(true);
  }

  return (
    <Card className='flex h-4/5 flex-col items-start items-center justify-center gap-4 border-4 border-blue-500'>
      <h3>Pomodoro Zen Mode</h3>
      <Image className='w-20' alt='profile-pic' src={profilePicture} />
      {/* Plus and Minus buttons that set timer length */}
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

      {/*White Timer Display */}
      <h3 className='flex w-28 justify-center bg-white px-20 py-7 text-3xl font-thin tracking-wider text-black'>
        {Math.floor(timer / 60)}:
        {timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
      </h3>

      {/*Progress Bar */}
      <div className='flex flex-col gap-y-4'>
        <Progress className='w-96' value={value} />
        <h2 className='2-xl self-center'>{value.toFixed(2)} %</h2>
      </div>

      {/*Button to start/end timer*/}
      <Button
        className={isCountingDown ? 'bg-red-500' : 'bg-green-500'}
        onClick={handleToggle}
      >
        {isCountingDown ? 'End Timer' : 'Start Timer'}
      </Button>

      {/*Button to go to Break Mode */}
      <Button
        disabled={isCountingDown ? true : false}
        onClick={() => redirect('./break-mode')}
      >
        Break Mode
      </Button>

      <Button className='bg-blue-500' onClick={() => redirect('./arc-timer')}>
        Back to Regular
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Exiting Pomodoro</DialogTitle>
            <DialogDescription>
              Are you sure you want to quit Pomodoro Zen Mode?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className='flex-auto'>
              <Button
                type='button'
                variant='secondary'
                className='bg-red-500'
                onClick={endTimer}
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose className='flex-auto'>
              <Button
                type='button'
                variant='secondary'
                className='bg-gray-500'
                onClick={continueTimer}
              >
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PomodoroMode;
