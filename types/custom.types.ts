export type Timer = {
  id: string;
  userId: string;
  targetDuration: number;
  elapsedTime: number;
  isCompleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
};
