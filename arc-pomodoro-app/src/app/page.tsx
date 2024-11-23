import ToggleModeButton from '@/components/ui/ToggleModeButton';

export default function Home() {
  return (
    <div className='bg-background text-text flex min-h-screen flex-col items-center justify-center'>
      <header className='bg-background w-full p-4 text-center shadow-md'>
        <h1 className='text-3xl font-bold'>Welcome to Arc-Pomodoro</h1>
      </header>

      <main className='mt-10 flex flex-col items-center space-y-6'>
        <p className='text-lg'>This is a simple homepage.</p>
        <ToggleModeButton />
      </main>

      <footer className='bg-background mt-auto w-full p-4 text-center'>
        <p className='text-sm'>bruh moment footer type beat</p>
      </footer>
    </div>
  );
}
