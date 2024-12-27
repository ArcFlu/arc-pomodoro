'use client';
import { Card, ToggleModeButton } from '@/components/index';
import { useContext, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { UserTimersContext } from './utils/TimersContext';
const rainbowColors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-blue-500',
  'text-indigo-500',
  'text-purple-500',
];
const DisplayForestStatsSection: React.FC = () => {
  const listOfTimers = useContext(UserTimersContext);
  return (
    <Card className='flex justify-center border-4 border-blue-500 p-2'>
      <Stack>
        <div className='justify-items-center'>
          <h1 className='pt-2 text-xl'>Display Forest Stats Section</h1>
          <ToggleModeButton />
        </div>
        <div>
          {listOfTimers &&
            listOfTimers.map((timer, index) => {
              return (
                <div
                  key={timer.id}
                  className={rainbowColors[index % rainbowColors.length]}
                >
                  <p>
                    {`Timer No. ${index + 1}: `}
                    <span className='text-xs'>
                      {JSON.stringify(timer, null, 2)}
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
      </Stack>
    </Card>
  );
};

export default DisplayForestStatsSection;
