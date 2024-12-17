import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();

  const currentUserId = session?.user.id;
  const currentUserRecord = await prisma.user.findFirst();

  const query = await prisma.timer.findMany({
    where: { userId: currentUserId },
  });

  return Response.json({
    message: 'Hello World',
    user: JSON.parse(JSON.stringify(currentUserRecord)),
    request,
    session,
    query,
  });
}
