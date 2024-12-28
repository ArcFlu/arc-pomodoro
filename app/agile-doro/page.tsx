import React from 'react';
import TaskPanel from './TaskPanel';
import TaskDetailsPage from './TaskDetailsPage';
import { Stack } from '@mui/material';

const Page: React.FC = () => {
  return (
    <div className='h-screen justify-between p-5'>
      <Stack direction='row' className='h-full gap-4 py-2'>
        <TaskPanel />
        <TaskDetailsPage />
      </Stack>
    </div>
  );
};

export default Page;
