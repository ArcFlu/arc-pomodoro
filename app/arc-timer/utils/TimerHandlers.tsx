'use server';
import {
  GET_TIMERS,
  CREATE_TIMER,
  DELETE_NUKE,
  TimerPostApiRequest,
} from '@/app/api/timer/route';
import { auth } from '@/app/auth';

export const handleGetTimers = async () => {
  const response = await GET_TIMERS();
  return await response.json();
};

export const handlePostTimers = async (targetDuration: number) => {
  const session = await auth();
  const currentUserId = session?.user.id;
  const res: TimerPostApiRequest = {
    timer: {
      targetDuration,
      user: {
        connect: { id: currentUserId },
      },
    },
  };
  const response = await CREATE_TIMER(res);
  return await response.json();
};

export const handleDeleteTimers = async () => {
  const response = await DELETE_NUKE();
  return;
};
