import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  return Response.json({
    loggedIn: Boolean(session),
  });
}
