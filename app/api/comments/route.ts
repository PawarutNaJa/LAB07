import {
  addComment,
  getComments,
  getCommentsByPostId,
} from '@/lib/comments';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (postId) {
    return Response.json({
      comments: getCommentsByPostId(postId),
    });
  }

  return Response.json({
    comments: getComments(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const postId =
      typeof body.postId === 'string'
        ? body.postId.trim()
        : '';

    const name =
      typeof body.name === 'string'
        ? body.name.trim()
        : '';

    const email =
      typeof body.email === 'string'
        ? body.email.trim()
        : '';

    const content =
      typeof body.content === 'string'
        ? body.content.trim()
        : '';

    if (!postId) {
      return Response.json(
        {
          error: 'ไม่พบรหัสโพสต์',
        },
        {
          status: 400,
        }
      );
    }

    if (name.length < 2) {
      return Response.json(
        {
          error: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร',
        },
        {
          status: 400,
        }
      );
    }

    if (!email.includes('@') || !email.includes('.')) {
      return Response.json(
        {
          error: 'รูปแบบอีเมลไม่ถูกต้อง',
        },
        {
          status: 400,
        }
      );
    }

    if (content.length < 5) {
      return Response.json(
        {
          error: 'ความคิดเห็นต้องมีอย่างน้อย 5 ตัวอักษร',
        },
        {
          status: 400,
        }
      );
    }

    if (content.length > 300) {
      return Response.json(
        {
          error: 'ความคิดเห็นต้องไม่เกิน 300 ตัวอักษร',
        },
        {
          status: 400,
        }
      );
    }

    const saved = addComment({
      postId,
      name,
      email,
      content,
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
        error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
      },
      {
        status: 400,
      }
    );
  }
}