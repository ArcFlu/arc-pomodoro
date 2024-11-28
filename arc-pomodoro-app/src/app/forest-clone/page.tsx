import React from 'react';

const Page: React.FC = () => {
  return (
    <div className='h-screen p-5'>
      <div className='flex h-1/3 items-center justify-center border-4 border-blue-500'>
        <h1 className='text-xl text-foreground'>Top Section</h1>
      </div>

      <div className='grid h-2/3 grid-cols-2'>
        <div className='flex items-center justify-center border-4 border-green-500'>
          <h1 className='text-xl text-foreground'>Left Section</h1>
        </div>
        <div className='flex items-center justify-center border-4 border-red-500'>
          <h1 className='text-xl text-foreground'>Right Section</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
