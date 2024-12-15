'use client';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import ToggleModeButton from '../components/custom-ui/ToggleModeButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Avatar, AvatarImage } from '@/components/shadcn-ui/avatar';
import { Button } from '@/components/shadcn-ui/button';

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
        <h2 className='text-secondary'>Welcome Back!</h2>
        <p className='m-0 text-center text-secondary'>
          Sign in to access your account and start using our awesome features.
        </p>
        <Button
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
      <Avatar className='h-48 w-48'>
        <AvatarImage alt={user?.name || 'User'} src={user?.image || ''} />
      </Avatar>
      <h2 className='text-secondary'>{user?.name || 'Anonymous'}</h2>
      <p className='text-secondary'>@{user?.userName || 'Unknown'}</p>
      <p className='mb-2 text-secondary'>
        {user?.email || 'No email provided'}
      </p>
      <Button
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

      <div className='min-w-screen mt-10 flex flex-row items-center space-x-6'>
        <AuthBlock />
        <div className='flex flex-col items-center'>
          <p className='text-lg'>This is a simple homepage.</p>
          <ToggleModeButton />
          <Button onClick={() => redirect('/arc-timer')}>
            Redirect to the Pomodoro page
          </Button>
          <p>omg yay shiv did it!</p>
        </div>
      </div>

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
