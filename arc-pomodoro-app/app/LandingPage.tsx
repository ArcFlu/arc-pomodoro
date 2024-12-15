'use client';
import ToggleModeButton from '../components/ui/ToggleModeButton';
import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AuthBlock: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Card className='w-full max-w-sm bg-primary'>
      <CardContent className='flex flex-col items-center p-6'>
        {children}
      </CardContent>
    </Card>
  );

  if (!session) {
    return (
      <AuthCard>
        <Typography variant='h5' className='mb-4 text-secondary'>
          Welcome Back!
        </Typography>
        <Typography variant='body1' className='mb-6 text-center text-secondary'>
          Sign in to access your account and start using our awesome features.
        </Typography>
        <Button
          variant='contained'
          className='w-full bg-background text-primary hover:bg-secondary'
          onClick={() => signIn('github')}
        >
          Sign in with Github
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Avatar
        alt={user?.name || 'User'}
        src={user?.image || ''}
        className='mb-4 h-24 w-24 border-2 border-secondary'
      />
      <Typography variant='h6' className='text-secondary'>
        {user?.name || 'Anonymous'}
      </Typography>
      <Typography variant='body1' className='text-secondary'>
        @{user?.userName || 'Unknown'}
      </Typography>
      <Typography variant='body2' className='mb-4 text-secondary'>
        {user?.email || 'No email provided'}
      </Typography>
      <Button
        variant='contained'
        className='w-full bg-background text-primary hover:bg-secondary'
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </AuthCard>
  );
};

const LandingPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <header className='w-full p-4 text-center shadow-md'>
        <h1 className='text-3xl font-bold'>Welcome to Arc-Pomodoro</h1>
      </header>

      <main className='min-w-screen mt-10 flex flex-row items-center space-x-6'>
        <AuthBlock />
        <div className='flex flex-col items-center'>
          <p className='text-lg'>This is a simple homepage.</p>
          <ToggleModeButton />
          <Button onClick={() => redirect('/arc-timer')}>
            Redirect to the Pomodoro page
          </Button>
          <p>omg yay shiv did it!</p>
        </div>
      </main>

      <footer className='mt-auto w-full p-4 text-center'>
        <p className='text-sm'>
          For questions and concerns, contact our developers at the following
          email: shivpatel0190@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
