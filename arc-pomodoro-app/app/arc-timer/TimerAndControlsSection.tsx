'use client';
import { Button, Card } from '@/components/index';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldNumberInput } from '../../components/src/mui-treasury/field-number-input';
import TimerApiButtons from '@/app/arc-timer/utils/TimerApiButtons';

//Initial Value on Controls drop down and Timer side.
const initTimerValue = 1;

const TimerAndControlsSection: React.FC = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(initTimerValue);
  const [inputFieldTimer, setInputFieldTimer] = useState(initTimerValue);
  const [countSuccess, setCountSuccess] = useState(0); // why were these initialized to 1 instead of 0?
  const [countFail, setCountFail] = useState(0);

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
    } else {
      if (timer === 0) {
        setCountSuccess((prev) => {
          const incrementCount = prev + 1;
          return incrementCount;
        });
      }
    }
  }, [isCountingDown]);

  const handleInputFieldTimerChange = (value: number | undefined) => {
    if (!value) return;
    setInputFieldTimer(value);
  };

  const handleStopClick = () => {
    console.log(timer);
    if (timer > 0 && isCountingDown) {
      setCountFail((prev) => {
        return prev + 1;
      });
      console.log('CountFail: ' + countFail);
    }
    setIsCountingDown(false);
  };

  const getControlsSection = () => {
    return (
      <Card className='flex flex-grow items-start justify-center border-4 border-green-500'>
        <Stack gap={2} className='items-center'>
          <h1 className='pt-2 text-xl text-foreground'>Controls Section</h1>
          <Stack gap={2} direction={'row'} className='flex items-center'>
            <FieldNumberInput
              defaultValue={initTimerValue}
              onChange={handleInputFieldTimerChange}
            />
            <Button
              onClick={() => {
                setTimer(inputFieldTimer);
                setIsCountingDown(false);
              }}
              className='h-full w-1/4 bg-cyan-500 hover:bg-cyan-700'
            >
              Set Timer
            </Button>
          </Stack>
          <Stack gap={2} direction={'row'}>
            <Button
              disabled={isCountingDown}
              onClick={() => {
                setIsCountingDown(true);
                setTimer(inputFieldTimer);
              }}
              className='bg-green-500 hover:bg-green-700'
            >
              Start
            </Button>
            <Button
              className='bg-red-500 hover:bg-red-700'
              onClick={handleStopClick}
            >
              Stop
            </Button>
          </Stack>
        </Stack>
      </Card>
    );
  };
  const getTimerSection = () => {
    return (
      <Card className='flex flex-grow items-start justify-center border-4 border-red-500'>
        <Stack gap={2} className='items-center'>
          <h1 className='pt-2 text-xl text-foreground'>Timer Section</h1>
          <h1
            className={
              isCountingDown
                ? 'animate-bounce bg-green-300 text-xl'
                : 'bg-red-300 text-base'
            }
          >
            Countdown: {timer}
          </h1>
          <h2>Success: {countSuccess}</h2>
          <h2>Fail: {countFail}</h2>
          <TimerApiButtons />
        </Stack>
      </Card>
    );
  };

  return (
    <Stack direction='row' className='h-2/3 gap-4 py-2'>
      {getControlsSection()}
      {getTimerSection()}
    </Stack>
  );
};

export default TimerAndControlsSection;
