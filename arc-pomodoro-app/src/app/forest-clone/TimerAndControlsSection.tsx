'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import { FieldNumberInput } from '@/components/src/mui-treasury/field-number-input';
import { NumberInputEventType } from '@/components/src/mui-treasury/use-number-input';

//Initial Value on Controls drop down and Timer side.
const initTimerValue = 10;

const TimerAndControlsSection: React.FC = () => {
  /* 
    1. isCountingDown useState: Initially set to false to prevent timer 
    from automatically counting down when we loaded the page.
    2. timer useState: timer variable initialized to initTimerValue.
    3. ??? Set input field of timer?
  */
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(initTimerValue);
  const [inputFieldTimer, setInputFieldTimer] = useState(initTimerValue);
  const [countSuccess, setCountSuccess] = useState(1);
  const [countFail, setCountFail] = useState(1);

  //useEffect has a dependency array. Inside it has isCountingDown. It will force it to rerun
  //every time isCountingDown changes.
  //useEffect: a "watcher" that checks for changes in your app and runs a set of instructions when those
  //changes happen.
  //watches the isCountingDown state. When isCountingDown changes, the useEffect will run its code.
  useEffect(() => {
    //if isCountingDown is true, run code inside the if block, else don't run.
    if (isCountingDown) {
      //interval variable is a intervalID for setInterval. To prevent setInterval from running forever,
      //clearInterval can be called() and it will tell Javascript to stop running the code.
      //The useEffect sets up something called an interval. An interval is like setting a timer on your
      //phone to remind you every second. In this case, every second, the code inside the setInterval will run.
      const interval = setInterval(() => {
        //setTimer is a useState that uses prevTimer which is the previous value of timer,
        //and decrements if the value is still above 0.
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          }
          //If the timer reaches 0, it stops the interval (clearInterval(interval))
          //and sets isCountingDown to false, meaning the countdown has finished.
          else {
            //The clearInterval(interval) stops the timer when the countdown reaches zero.
            //This prevents the timer from continuing to count after it hits zero.
            //When we use setInterval, we're basically saying "Hey, please run this code every X milliseconds
            //(e.g., 1000ms = 1 second)."
            //clearInterval is the off switch for that interval. Once the timer is running,
            //you need a way to stop it when you’re done. So, clearInterval(interval) stops that timer from running anymore.
            //setInterval runs the countdown every second. clearInterval(interval) stops
            //it once the countdown is done (i.e., when the timer reaches 0).
            if (timer == 0) {
              setCountSuccess((prev) => {
                return prev + 1;
              });
              console.log('Count Success' + countSuccess);
            }
            clearInterval(interval);
            //if you don't set this to false it will keep bouncing at 0
            setIsCountingDown(false);
            return 0;
          }
        });
      }, 1000);

      //return () => clearInterval(interval); at the end of the useEffect is important. It’s a clean-up step.
      //If the countdown stops or if something changes, this line makes sure to clean up the interval,
      //stopping the countdown process properly, so your app doesn’t keep running unnecessary code in the background.
      return () => clearInterval(interval); // Clean up the interval on unmount or dependency change
    }
  }, [isCountingDown]);

  //If a valid number is passed to the function, it updates inputFieldTimer with that number.
  //If the value is not a valid number (or is undefined), it does nothing.
  //Sets up CountDown on the right side.
  const handleInputFieldTimerChange = (value: number | undefined) => {
    if (!value) return;
    setInputFieldTimer(value);
  };

  const handleStopClick = () => {
    console.log(timer);
    if (timer > 0) {
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
