import {
  editMessage,
  getMessageById,
  removeMessage,
} from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { getSessionUserId } from '@/lib/session';

export const GET = withErrorHandling(
  async (
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    const message = await getMessageById(id);

    return Response.json({
      message,
    });
  }
);

export const PATCH = withErrorHandling(
  async (
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    const sessionUserId = getSessionUserId(request);
    const updates = await request.json();

    const updated = await editMessage(
      id,
      updates,
      sessionUserId
    );

    return Response.json({
      ok: true,
      item: updated,
    });
  }
);

export const DELETE = withErrorHandling(
  async (
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    const sessionUserId = getSessionUserId(request);
    await removeMessage(id, sessionUserId);

    return Response.json(
      {
        ok: true,
      },
      {
        status: 200,
      }
    );
  }
);