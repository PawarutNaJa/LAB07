import {
  createTask,
  listTasks,
} from '@/lib/taskService';

import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(
  async () => {
    const tasks = listTasks();

    return Response.json({
      tasks,
    });
  }
);

export const POST = withErrorHandling(
  async (request: Request) => {
    const body = await request.json();

    const saved = createTask({
      title: body?.title,
      completed: body?.completed,
    });

    return Response.json(
      {
        ok: true,
        item: saved,
      },
      {
        status: 201,
      }
    );
  }
);