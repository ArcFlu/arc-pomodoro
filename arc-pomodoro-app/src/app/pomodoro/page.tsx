import { Card } from '@mui/material';
import Timer from './Timer';

const Page = () => {
  return (
    <>
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='flex:col justify-items-center p-10'>
          <h1 className='pb-4 text-red-700'>Pomodoro Timer</h1>
          <Timer className='text-9xl text-cyan-700' />
        </Card>
      </div>
    </>
  );
};

export default Page;
