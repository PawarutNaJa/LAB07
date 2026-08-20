export function withErrorHandling<T = unknown>(
  handler: (request: Request, context: T) => Promise<Response>
) {
  return async (request: Request, context: T) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('API Error:', error);

      const status =
        error instanceof Error &&
        'status' in error &&
        typeof (error as Record<string, unknown>).status === 'number'
          ? ((error as Record<string, unknown>).status as number)
          : 500;

      const message =
        error instanceof Error
          ? error.message
          : 'เกิดข้อผิดพลาดที่ไม่คาดคิด';

      return Response.json(
        {
          error: message,
        },
        {
          status,
        }
      );
    }
  };
}