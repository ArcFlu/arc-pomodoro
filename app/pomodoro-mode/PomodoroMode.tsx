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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/shadcn-ui/dropdown';

const PomodoroMode: React.FC = () => {
  const DEFAULT_POMODORO_TIMER = 900;
  const DEFAULT_BREAK_TIMER = 300;
  const DEFAULT_LONG_BREAK_TIMER = 1200;

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(DEFAULT_POMODORO_TIMER);
  const [initTimerValue, setInitTimerValue] = useState(DEFAULT_POMODORO_TIMER);
  const [open, setOpen] = useState(false);

  const [breakIsCountingDown, setBreakIsCountingDown] = useState(false);
  const [breakTimer, setBreakTimer] = useState(DEFAULT_BREAK_TIMER);
  const [breakInitTimerValue, setBreakInitTimerValue] =
    useState(DEFAULT_BREAK_TIMER);

  const [breakDisplay, setBreakDisplay] = useState(false);
  const [breakDisable, setBreakDisable] = useState(false);
  const [breakMode, setBreakMode] = useState(false);

  const [position, setPosition] = React.useState('15');
  const [breakPosition, setBreakPosition] = React.useState('5');

  const [breakPositionLong, setBreakPositionLong] = React.useState('15');
  const [breakTimerLong, setBreakTimerLong] = useState(
    DEFAULT_LONG_BREAK_TIMER
  );
  const [breakInitTimerValueLong, setBreakInitTimerValueLong] = useState(
    DEFAULT_LONG_BREAK_TIMER
  );

  const [count, setCount] = useState(0);

  {
    /*useEffect 1: Counts down timer until it hits 0. 
    If it does, clear interval, change isCountingDown to false
    and sets the timer to the initial timer value to display it */
  }
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
            setBreakMode(true);
            if (count % 4 == 0) {
              setBreakTimer(breakInitTimerValueLong);
              setCount(0);
            }
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      /*Set Count so it increments correctly */
      setCount((prev) => prev + 1);
      console.log(count);
    }
  }, [isCountingDown]);

  {
    /*useEffect 2: Counts down break timer until it hits 0. 
    If it does, clear interval, sets the timer to the initial break 
    time to display it */
  }

  useEffect(() => {
    if (breakIsCountingDown) {
      const interval = setInterval(() => {
        setBreakTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setBreakTimer(breakInitTimerValue);
            setBreakMode(false);
            setBreakIsCountingDown(false);
            setBreakDisable(false);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [breakIsCountingDown]);

  {
    /*On the Start/End Timer button. If timer is currently counting down, use setOpen to display the dialog box to quit timer or not
    If not, set isCountingDown to start counting down and thus starting timer.*/
  }
  const handleToggle = () => {
    if (isCountingDown) {
      setOpen(true);
    } else {
      setIsCountingDown((prev) => !prev);
    }
  };

  {
    /*Progress Bar value */
  }
  let value = 100 - (timer / initTimerValue) * 100;

  {
    /*On the Dialog screen. If user selects Yes, run this function. This closes the dialog box (setOpen(false)), 
      sets time on screen to initial value, set the initial timer value back to its initial value and stops counting.*/
  }
  function endTimer() {
    setOpen(false);
    setTimer(initTimerValue);
    setInitTimerValue(initTimerValue);
    setIsCountingDown(false);
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  }

  {
    /*On the Dialog screen. If user selects No, run this function. This closes the dialog box and keeps the timer running.*/
  }
  function continueTimer() {
    if (timer == 0) {
      setOpen(false);
      setTimer(initTimerValue);
      setInitTimerValue(initTimerValue);
      setIsCountingDown(false);
    } else {
      setOpen(false);
      setIsCountingDown(true);
    }
  }

  {
    {
      /*if you want original implementation with that bug where if you press yes it sends you back to pomodoro mode change this*/
    }
  }
  function endTimerBreak() {
    if (breakTimer == 0) {
      setBreakDisplay(false);
      setBreakTimer(breakInitTimerValue);
    } else {
      setBreakIsCountingDown(false);
      setBreakDisplay(false);
      setBreakTimer(breakInitTimerValue);
      setBreakMode((prev) => !prev);
      setBreakDisable(false);
    }
  }

  function toggleTimerBreak() {
    setBreakDisplay(false);
    setBreakIsCountingDown((prev) => !prev);
  }

  function toggleTimer() {
    setIsCountingDown((prev) => !prev);
  }

  {
    /*On the Break Dialog screen. If user selects No, run this function. This sets closes the Break Dialog box.*/
  }
  function continueTimerBreak() {
    if (breakTimer == 0) {
      setBreakDisplay(false);
      setBreakTimer(breakInitTimerValue);
      setBreakInitTimerValue(breakInitTimerValue);
      setBreakIsCountingDown(false);
    } else {
      setBreakDisplay(false);
      setBreakIsCountingDown(false);
    }
  }

  {
    /*On the Start/End Break Timer button. If timer is currently counting down, use setBreakDisplay to display the dialog box to quit timer or not.
    If not the timer is not counting down(meaning it hasn't started yet), set isCountingDown to start counting down and thus starting the timer.*/
  }
  const breakHandleToggle = () => {
    setBreakDisplay(true);
    if (breakTimer == 0) {
      setBreakTimer(breakInitTimerValue);
      setBreakInitTimerValue(breakInitTimerValue);
      setBreakIsCountingDown(false);
    }
  };

  {
    /*On the Pomodoro/Break Drop Down. Sets Pomodoro Time*/
  }
  function pomodoroDuration(time: string) {
    setPosition(time);
    setTimer(Number(time) * 60);
    setInitTimerValue(Number(time) * 60);
  }

  {
    /*On the Pomodoro/Break Drop Down. Sets Break Time*/
  }
  function breakDuration(time: string) {
    setBreakPosition(time);
    setBreakTimer(Number(time) * 60);
    setBreakInitTimerValue(Number(time) * 60);
  }

  function breakDurationLong(time: string) {
    setBreakPositionLong(time);
    setBreakTimerLong(Number(time) * 60);
    setBreakInitTimerValueLong(Number(time) * 60);
  }

  return (
    <Card className='inline-flex flex-col items-center justify-center gap-4 border-4 border-blue-500'>
      {!breakMode ? (
        <>
          {/*Pomodoro Zen Mode */}
          <h3>Pomodoro Zen Mode</h3>
          <Image className='w-20' alt='profile-pic' src={profilePicture} />
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

          <div className='flex flex-col gap-y-5'>
            <div className='flex gap-x-5'>
              {/*Button to start/end timer*/}
              <Button
                className={isCountingDown ? 'bg-slate-50' : 'bg-green-500'}
                onClick={toggleTimer}
              >
                {isCountingDown ? 'Pause' : 'Start'}
              </Button>
              <Button
                className={'bg-red-500'}
                onClick={handleToggle}
                disabled={!isCountingDown ? true : false}
              >
                End Timer
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  disabled={isCountingDown ? true : false}
                  className={
                    isCountingDown
                      ? 'rounded-lg bg-orange-900 p-2 text-sm text-black'
                      : 'rounded-lg bg-orange-500 p-2 text-sm text-black'
                  }
                >
                  Set Timer
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Set Pomodoro Time
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup
                            value={position}
                            onValueChange={setPosition}
                          >
                            <DropdownMenuRadioItem
                              value={'15'}
                              onClick={() => pomodoroDuration('15')}
                            >
                              15 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={'20'}
                              onClick={() => pomodoroDuration('20')}
                            >
                              20 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`25`}
                              onClick={() => pomodoroDuration('25')}
                            >
                              25 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`30`}
                              onClick={() => pomodoroDuration('30')}
                            >
                              30 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`45`}
                              onClick={() => pomodoroDuration('45')}
                            >
                              45 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`60`}
                              onClick={() => pomodoroDuration('60')}
                            >
                              60 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`90`}
                              onClick={() => pomodoroDuration('90')}
                            >
                              90 minutes
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Set Break Time
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem disabled>
                            Short Break
                          </DropdownMenuItem>
                          <DropdownMenuRadioGroup
                            value={breakPosition}
                            onValueChange={setBreakPosition}
                          >
                            <DropdownMenuRadioItem
                              value={`5`}
                              onClick={() => breakDuration('5')}
                            >
                              5 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`10`}
                              onClick={() => breakDuration('10')}
                            >
                              10 minutes
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                          <DropdownMenuRadioGroup
                            value={breakPositionLong}
                            onValueChange={setBreakPositionLong}
                          >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled>
                              Long Break
                            </DropdownMenuItem>
                            <DropdownMenuRadioItem
                              value={`15`}
                              onClick={() => breakDurationLong('15')}
                            >
                              15 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`20`}
                              onClick={() => breakDurationLong('20')}
                            >
                              20 minutes
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value={`30`}
                              onClick={() => breakDurationLong('30')}
                            >
                              30 minutes
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/*Button to go back to Arc Timer*/}
            <Button
              className='bg-blue-500'
              onClick={() => redirect('./arc-timer')}
            >
              Back to Arc Timer Page
            </Button>
          </div>
          {/*Pomodoro Dialog */}
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
          {/*Break Mode View */}
          <h3>Break Mode</h3>
          <Image className='w-20' alt='profile-pic' src={profilePicture} />
          {/*White Timer Display */}
          <h3 className='flex w-28 justify-center bg-white px-20 py-7 text-3xl font-thin tracking-wider text-black'>
            {Math.floor(breakTimer / 60)}:
            {breakTimer % 60 < 10 ? '0' + (breakTimer % 60) : breakTimer % 60}
          </h3>
          {/*Button to start/end break */}
          <div className='flex gap-x-4'>
            <Button
              className={breakIsCountingDown ? 'bg-slate-50' : 'bg-green-500'}
              onClick={toggleTimerBreak}
              disabled={breakDisable ? true : false}
            >
              {breakIsCountingDown ? 'Pause Break' : 'Start Break'}
            </Button>
            <Button className={'bg-indigo-500'} onClick={breakHandleToggle}>
              Skip Break
            </Button>
          </div>
          {/*Break Dialog */}
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
