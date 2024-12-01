'use client';
import { SessionProvider } from 'next-auth/react';
import LandingPage from './LandingPage';

export default function App() {
  return (
    <SessionProvider>
      <LandingPage />
    </SessionProvider>
  );
}
