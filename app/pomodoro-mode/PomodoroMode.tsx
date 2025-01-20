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

  const [breakIsCountingDown, setBreakIsCountingDown] = useState(false);
  const [breakTimer, setBreakTimer] = useState(300);
  const [breakDisplay, setBreakDisplay] = useState(false);
  const [breakDisable, setBreakDisable] = useState(false);
  const [breakMode, setBreakMode] = useState(false);

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

  useEffect(() => {
    if (breakIsCountingDown) {
      const interval = setInterval(() => {
        setBreakTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setBreakTimer(300);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [breakIsCountingDown]);

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

  function endTimer() {
    setOpen(false);
    setTimer(initTimerValue);
    setInitTimerValue(initTimerValue);
    setIsCountingDown(false);
  }

  function continueTimer() {
    setOpen(false);
    setIsCountingDown(true);
  }

  function endTimerBreak() {
    setBreakTimer(300);
    setBreakIsCountingDown(false);
    setBreakDisplay(false);
    setBreakDisable(true);
  }

  function continueTimerBreak() {
    setBreakDisplay(false);
  }

  function returnToPomodoro() {
    setBreakMode((prev) => !prev);
    setBreakDisable(false);
    setBreakTimer(300);
    setBreakIsCountingDown(false);
  }

  const breakHandleToggle = () => {
    if (breakIsCountingDown) {
      setBreakDisplay(true);
    } else {
      setBreakIsCountingDown((prev) => !prev);
    }
  };

  return (
    <Card className='flex h-full flex-col items-start items-center justify-center gap-4 border-4 border-blue-500'>
      {!breakMode ? (
        <>
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

          <Button
            disabled={isCountingDown ? true : false}
            onClick={() => setBreakMode((prev) => !prev)}
          >
            Break Mode
          </Button>

          <Button
            className='bg-blue-500'
            onClick={() => redirect('./arc-timer')}
          >
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
        </>
      ) : (
        <>
          <h3>Break Mode</h3>
          <Image className='w-20' alt='profile-pic' src={profilePicture} />
          <h3 className='flex w-28 justify-center bg-white px-20 py-7 text-3xl font-thin tracking-wider text-black'>
            {Math.floor(breakTimer / 60)}:
            {breakTimer % 60 < 10 ? '0' + (breakTimer % 60) : breakTimer % 60}
          </h3>
          <Button
            className={breakIsCountingDown ? 'bg-red-500' : 'bg-green-500'}
            onClick={breakHandleToggle}
            disabled={breakDisable ? true : false}
          >
            {breakIsCountingDown ? 'End Break' : 'Start Break'}
          </Button>

          <Button className='bg-blue-500' onClick={returnToPomodoro}>
            Back to Pomodoro Mode
          </Button>
          <Dialog open={breakDisplay} onOpenChange={setBreakDisplay}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Exiting Break Mode</DialogTitle>
                <DialogDescription>
                  Are you sure you want to quit Break Mode?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose className='flex-auto'>
                  <Button
                    type='button'
                    variant='secondary'
                    className='bg-red-500'
                    onClick={endTimerBreak}
                  >
                    Yes
                  </Button>
                </DialogClose>
                <DialogClose className='flex-auto'>
                  <Button
                    type='button'
                    variant='secondary'
                    className='bg-gray-500'
                    onClick={continueTimerBreak}
                  >
                    No
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Card>
  );
};

export default PomodoroMode;
