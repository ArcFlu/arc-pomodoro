import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET_TIMERS() {
  const session = await auth();
  const currentUserId = session?.user.id;

  const query = await prisma.timer.findMany({
    where: { userId: currentUserId },
  });

  return Response.json(query);
}
export interface TimerPostApiRequest {
  timer: Prisma.TimerCreateInput;
}

export async function CREATE_TIMER(req: TimerPostApiRequest) {
  const createdTimer = await prisma.timer.create({
    data: { ...req.timer },
  });

  return Response.json(createdTimer);
}

export async function DELETE_NUKE() {
  const session = await auth();
  const currentUserId = session?.user.id;
  const result = await prisma.user.update({
    where: { id: currentUserId },
    data: {
      timers: {
        deleteMany: {},
      },
    },
    include: { timers: true },
  });
}
