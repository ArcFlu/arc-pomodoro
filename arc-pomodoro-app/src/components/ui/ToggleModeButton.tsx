'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ToggleModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is only rendered after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  };

  // Don't render anything until the client-side hydration is complete
  if (!mounted) return null;

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme}>
      {theme === 'light' && <Sun className='h-[1.2rem] w-[1.2rem]' />}
      {theme === 'dark' && <Moon className='h-[1.2rem] w-[1.2rem]' />}
    </Button>
  );
}

export default ToggleModeButton;
