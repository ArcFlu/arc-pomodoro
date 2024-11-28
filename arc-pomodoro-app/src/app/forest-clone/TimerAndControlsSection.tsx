'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import { FieldNumberInput } from '@/components/src/mui-treasury/field-number-input';
import { NumberInputEventType } from '@/components/src/mui-treasury/use-number-input';

const initTimerValue = 10;

const TimerAndControlsSection: React.FC = () => {
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

      return () => clearInterval(interval); // Clean up the interval on unmount or dependency change
    }
  }, [isCountingDown]);

  const handleInputFieldTimerChange = (value: number | undefined) => {
    if (!value) return;
    setInputFieldTimer(value);
  };

  const getControlsSection = () => {
    return (
      <Paper
        elevation={4}
        className='flex flex-grow items-start justify-center border-4 border-green-500'
      >
        <Stack gap={2} className='items-center'>
          <h1 className='pt-2 text-xl text-foreground'>Controls Section</h1>
          <Stack gap={2} direction={'row'}>
            <FieldNumberInput
              defaultValue={initTimerValue}
              onChange={handleInputFieldTimerChange}
            />
            <Button
              variant='contained'
              onClick={() => {
                setTimer(inputFieldTimer);
                setIsCountingDown(false);
              }}
            >
              Set Timer
            </Button>
          </Stack>
          <Stack gap={2} direction={'row'}>
            <Button
              variant='outlined'
              color='error'
              onClick={() => setIsCountingDown(false)}
            >
              Stop
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() => setIsCountingDown(true)}
            >
              Start
            </Button>
          </Stack>
        </Stack>
      </Paper>
    );
  };
  const getTimerSection = () => {
    return (
      <Paper
        elevation={4}
        className='flex flex-grow items-start justify-center border-4 border-red-500'
      >
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
        </Stack>
      </Paper>
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