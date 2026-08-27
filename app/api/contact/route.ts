import {
  createMessage,
  listMessages,
} from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';

  const allMessages = await listMessages();

  const filteredMessages = search
    ? allMessages.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.message.toLowerCase().includes(search.toLowerCase())
        );
      })
    : allMessages;

  return Response.json({
    messages: filteredMessages,
  });
});

import { cookies } from 'next/headers';

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const sessionUserId = (await cookies()).get('session')?.value || null;

  const name =
    typeof body?.name === 'string'
      ? body.name.trim()
      : '';

  const email =
    typeof body?.email === 'string'
      ? body.email.trim()
      : '';

  const message =
    typeof body?.message === 'string'
      ? body.message.trim()
      : typeof body?.content === 'string'
        ? body.content.trim()
        : '';

  const saved = await createMessage({
    name,
    email,
    message,
    authorId: sessionUserId,
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