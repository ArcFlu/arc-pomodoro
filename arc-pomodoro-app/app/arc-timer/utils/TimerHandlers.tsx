'use server';
import { GET, POST, TimerPostApiRequest } from '@/app/api/user/route';
import { auth } from '@/app/auth';

export const handleGetTimers = async () => {
  const response = await GET();
  return await response.json();
};

export const handlePostTimers = async () => {
  const session = await auth();
  const currentUserId = session?.user.id;
  const res: TimerPostApiRequest = {
    timer: {
      durationInSeconds: 0,
      result: false,
      user: {
        connect: { id: currentUserId },
      },
    },
  };
  const response = await POST(res);
  return await response.json();
};
