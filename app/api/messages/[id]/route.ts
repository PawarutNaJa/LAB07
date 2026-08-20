import {
  editMessage,
  getMessageById,
  removeMessage,
} from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

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
    const updates = await request.json();

    const updated = await editMessage(
      id,
      updates
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
    await removeMessage(id);

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