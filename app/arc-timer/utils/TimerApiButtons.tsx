import { Stack } from '@mui/material';
import { Button } from '../../../components/shadcn-ui/button';
import {
  handleDeleteTimers,
  handleGetTimers,
  handlePostTimers,
} from './TimerHandlers';

const onReadClick = async () => {
  const res = await handleGetTimers();
  console.log(res);
};

const onCreateClick = async (targetDuration: number) => {
  const res = await handlePostTimers(targetDuration);
  console.log(res);
};

const onDeleteClick = async () => {
  await handleDeleteTimers();
  console.log('delete nuke === bruh moment');
};

const TimerApiButtons = () => {
  return (
    <Stack gap={2} className='items-center border-2 border-purple-500 p-5'>
      <Button className='bg-green-400' onClick={() => onCreateClick(10)}>
        {'Create'}
      </Button>
      <Button className='bg-blue-400' onClick={() => onReadClick()}>
        {'Read'}
      </Button>
      <Button className='bg-orange-400'>{'Update'}</Button>
      <Button className='bg-red-500' onClick={() => onDeleteClick()}>
        {'Delete Nuke'}
      </Button>
    </Stack>
  );
};

export default TimerApiButtons;
