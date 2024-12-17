import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

// export async function GET() {
//   const session = await auth();

//   const currentUserId = session?.user.id;
//   const currentUserRecord = await prisma.user.findFirst();

//   const query = await prisma.timer.findMany({
//     where: { userId: currentUserId },
//   });

//   return Response.json({
//     message: 'Hello World',
//     user: JSON.parse(JSON.stringify(currentUserRecord)),
//     session,
//     query,
//   });
// }

export async function GET() {
  const session = await auth();
  const currentUserId = session?.user.id;

  const query = await prisma.timer.findMany({
    where: { userId: currentUserId },
  });

  return Response.json({
    query,
  });
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
