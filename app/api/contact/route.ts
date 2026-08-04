import { addMessage, getMessages } from '@/lib/messages';

export async function GET() {
  return Response.json({
    messages: getMessages(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.message
    ) {
      return Response.json(
        {
          error: 'ข้อมูลไม่ครบ',
        },
        {
          status: 400,
        }
      );
    }

    const saved = addMessage({
      name: body.name,
      email: body.email,
      message: body.message,
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
  } catch {
    return Response.json(
      {
        error: 'ข้อมูลไม่ถูกต้อง',
      },
      {
        status: 400,
      }
    );
  }
}