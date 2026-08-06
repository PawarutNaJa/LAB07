import {
  editMessage,
  getMessageById,
  removeMessage,
} from '@/lib/messageService';

import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(
  async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    const message = getMessageById(params.id);

    return Response.json({
      message,
    });
  }
);

export const PATCH = withErrorHandling(
  async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    const updates = await request.json();

    const updated = editMessage(
      params.id,
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
    { params }: { params: { id: string } }
  ) => {
    removeMessage(params.id);

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