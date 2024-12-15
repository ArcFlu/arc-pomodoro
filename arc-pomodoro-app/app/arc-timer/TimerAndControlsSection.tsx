'use client';
import React, { useEffect, useState } from 'react';
import { Paper, Stack, Button } from '@mui/material';
import { FieldNumberInput } from '../../components/src/mui-treasury/field-number-input';

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
            <Button variant='outlined' color='error' onClick={handleStopClick}>
              Stop
            </Button>
            <Button
              disabled={isCountingDown}
              variant='contained'
              color='success'
              onClick={() => {
                setIsCountingDown(true);
                setTimer(inputFieldTimer);
              }}
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
          <h2>Success: {countSuccess}</h2>
          <h2>Fail: {countFail}</h2>
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
