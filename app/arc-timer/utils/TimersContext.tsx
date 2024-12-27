import { Timer } from '@/types/custom.types';
import { createContext } from 'react';

export const UserTimersContext = createContext([] as Timer[]);
export const ActiveTimerContext = createContext({});
