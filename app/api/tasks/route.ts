import {
  createTask,
  listTasks,
} from '@/lib/taskService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  const completedParam = url.searchParams.get('completed');

  let tasks = await listTasks();

  if (search) {
    tasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (completedParam !== null) {
    const isCompleted = completedParam === 'true';
    tasks = tasks.filter((t) => t.completed === isCompleted);
  }

  return Response.json({
    tasks,
  });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();

  const saved = await createTask({
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
});