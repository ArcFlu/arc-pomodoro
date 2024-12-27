'use client';
import { Card, ToggleModeButton } from '@/components/index';
import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { UserTimersContext } from './utils/TimersContext';

const DisplayForestStatsSection: React.FC = () => {
  const listOfTimers = useContext(UserTimersContext);

  return (
    <Card className='flex items-start border-4 border-blue-500 p-2'>
      <Stack>
        <div className='justify-items-center'>
          <h1 className='pt-2 text-xl'>Display Forest Stats Section</h1>
          <ToggleModeButton />
        </div>
        <div>
          {listOfTimers &&
            listOfTimers.map((timer) => {
              return <p key={timer.id}>{JSON.stringify(timer, null, 2)}</p>;
            })}
        </div>
      </Stack>
    </Card>
  );
};

export default DisplayForestStatsSection;
