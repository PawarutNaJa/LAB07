import {
  editTask,
  findTaskById,
  removeTask,
} from '@/lib/taskService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(
  async (
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    const task = await findTaskById(id);

    return Response.json({
      task,
    });
  }
);

export const PATCH = withErrorHandling(
  async (
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await editTask(id, {
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
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await context.params;
    await removeTask(id);

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