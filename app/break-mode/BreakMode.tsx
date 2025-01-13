'use client';
import { Card, Button } from '@/components/index';
import profilePicture from '../pomodoro-mode/profile-picture.jpg';
import Image from 'next/image';
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

const BreakMode: React.FC = () => {
  const [breakMode, setBreakMode] = useState(false);
  const [breakTimer, setBreakTimer] = useState(300);
  const [isCountingDownBreak, setIsCountingDownBreak] = useState(false);
  const [openBreak, setOpenBreak] = useState(false);
  const [disableBreak, setDisableBreak] = useState(false);

  useEffect(() => {
    if (isCountingDownBreak) {
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
  }, [isCountingDownBreak]);

  /* End Break function */
  function endBreak() {
    setBreakTimer(300);
    setIsCountingDownBreak(false);
    setOpenBreak(false);
    setDisableBreak(true);
  }

  /* Continue Break function */
  function continueBreak() {
    setOpenBreak(false);
  }

  function returnToPomodoro() {
    setBreakMode((prev) => !prev);
    setDisableBreak(false);
    setBreakTimer(300);
    setIsCountingDownBreak(false);
    redirect('./pomodoro-mode');
  }

  const handleToggleBreak = () => {
    if (isCountingDownBreak) {
      setOpenBreak(true);
    } else {
      setIsCountingDownBreak((prev) => !prev);
    }
  };

  return (
    <Card className='flex h-4/5 flex-col items-start items-center justify-center gap-4 border-4 border-blue-500'>
      <>
        {/*Break Mode View */}
        <h3>Break Mode</h3>
        <Image className='w-20' alt='profile-pic' src={profilePicture} />
        {/*White Timer Display */}
        <h3 className='flex w-28 justify-center bg-white px-20 py-7 text-3xl font-thin tracking-wider text-black'>
          {Math.floor(breakTimer / 60)}:
          {breakTimer % 60 < 10 ? '0' + (breakTimer % 60) : breakTimer % 60}
        </h3>
        <Button
          className={isCountingDownBreak ? 'bg-red-500' : 'bg-green-500'}
          onClick={handleToggleBreak}
          disabled={disableBreak ? true : false}
        >
          {isCountingDownBreak ? 'End Break' : 'Start Break'}
        </Button>

        <Button className='bg-blue-500' onClick={returnToPomodoro}>
          Back to Pomodoro Mode
        </Button>
        <Dialog open={openBreak} onOpenChange={setOpenBreak}>
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
                  onClick={endBreak}
                >
                  Yes
                </Button>
              </DialogClose>
              <DialogClose className='flex-auto'>
                <Button
                  type='button'
                  variant='secondary'
                  className='bg-gray-500'
                  onClick={continueBreak}
                >
                  No
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </Card>
  );
};

export default BreakMode;
