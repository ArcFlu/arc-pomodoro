import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET() {
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

export async function POST(req: TimerPostApiRequest) {
  const createdTimer = await prisma.timer.create({
    data: { ...req.timer },
  });

  return Response.json(createdTimer);
}

export async function DELETE() {
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
