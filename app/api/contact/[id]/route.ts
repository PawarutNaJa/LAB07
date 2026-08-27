import { cookies } from 'next/headers';
import { editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { ForbiddenError } from '@/lib/errors';

// Helper function to verify ownership
async function verifyOwnershipOrAdmin(messageId: string, sessionUserId: string | null) {
  if (!sessionUserId) {
    throw new ForbiddenError('กรุณาเข้าสู่ระบบก่อนทำรายการ');
  }
}

export const PUT = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = await request.json();
  const sessionUserId = (await cookies()).get('session')?.value || null;

  await verifyOwnershipOrAdmin(id, sessionUserId);

  const updated = await editMessage(id, body, sessionUserId);

  return Response.json({
    ok: true,
    item: updated,
  });
});

export const DELETE = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const sessionUserId = (await cookies()).get('session')?.value || null;

  await verifyOwnershipOrAdmin(id, sessionUserId);

  await removeMessage(id, sessionUserId);

  return Response.json({ ok: true });
});
