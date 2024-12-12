'use client';
import ToggleModeButton from '@/components/ui/ToggleModeButton';
import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AuthBlock: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <Button onClick={() => signIn('github')}>Sign in with Github</Button>
        </>
      )}
      {session && (
        <>
          Signed in as {JSON.stringify(session)} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  );
};
const LandingPage = () => {
  return (
    <div className='text-text flex min-h-screen flex-col items-center justify-center bg-background'>
      <header className='w-full bg-background p-4 text-center shadow-md'>
        <h1 className='text-3xl font-bold'>Welcome to Arc-Pomodoro</h1>
        <AuthBlock />
      </header>

      <main className='mt-10 flex flex-col items-center space-y-6'>
        <p className='text-lg'>This is a simple homepage.</p>
        <ToggleModeButton />
        <Button onClick={() => redirect('/forest-clone')}>
          redirect to the pomodoro page
        </Button>
        <p>omg yay shiv did it!</p>
      </main>

      <footer className='mt-auto w-full bg-background p-4 text-center'>
        <p className='text-sm'>
          For questions and concerns, contact our developers at the following
          email: shivpatel0190@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
