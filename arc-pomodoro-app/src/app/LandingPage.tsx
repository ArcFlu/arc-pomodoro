'use client';
import ToggleModeButton from '@/components/ui/ToggleModeButton';
import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthBlock: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={() =>
              signIn('github', { callbackUrl: 'http://localhost:3000/' })
            }
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {JSON.stringify(session)} <br />
          <button onClick={() => signOut()}>Sign out</button>
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
        <Button> redirect to the pomodoro page</Button>
        <p>also not implemented yet</p>
      </main>

      <footer className='mt-auto w-full bg-background p-4 text-center'>
        <p className='text-sm'>bruh moment footer type beat</p>
      </footer>
    </div>
  );
};

export default LandingPage;
