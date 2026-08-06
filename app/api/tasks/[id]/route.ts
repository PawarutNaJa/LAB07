import {
  editTask,
  findTaskById,
  removeTask,
} from '@/lib/taskService';

import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(
  async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    const task = findTaskById(params.id);

    return Response.json({
      task,
    });
  }
);

export const PATCH = withErrorHandling(
  async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    const body = await request.json();

    const updated = editTask(params.id, {
      title: body?.title,
      completed: body?.completed,
    });

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
    removeTask(params.id);

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