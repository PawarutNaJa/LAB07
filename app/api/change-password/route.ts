// app/api/change-password/route.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getSessionUserId } from '@/lib/session';

const passwordSchema = z.object({
  newPassword: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
});

export async function POST(request: Request) {
  const sessionUserId = getSessionUserId(request);
  if (!sessionUserId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { oldPassword, newPassword } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: sessionUserId },
  });

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    return Response.json({ error: 'รหัสผ่านเดิมไม่ถูกต้อง' }, { status: 400 });
  }

  try {
    passwordSchema.parse({ newPassword });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err.issues[0].message }, { status: 400 });
    }
    return Response.json({ error: 'Bad Request' }, { status: 400 });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: sessionUserId },
    data: { password: hashedNewPassword },
  });

  return Response.json({ ok: true });
}
