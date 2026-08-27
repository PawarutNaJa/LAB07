import * as MessageModel from './messages';
import { Prisma } from '@prisma/client';
import {
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from './errors';
import { messageSchema } from './schemas';
import { cleanRichText } from './sanitize';
import { ZodError } from 'zod';

export async function createMessage(raw: unknown) {
  let data;
  try {
    data = messageSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
  }

  const safeText = cleanRichText(data.message);
  const finalData = { ...data, message: safeText };

  try {
    return await MessageModel.addMessage(finalData);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
    }
    throw err;
  }
}

export async function listMessages() {
  return MessageModel.getMessages();
}

export async function getMessageById(id: string) {
  const message = await MessageModel.getMessageById(id);

  if (!message) {
    throw new NotFoundError('ไม่พบข้อความนี้');
  }

  return message;
}

export async function editMessage(
  id: string,
  updates: unknown,
  sessionUserId: string | null
) {
  const message = await getMessageById(id);
  if (message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  let parsedUpdates;
  try {
    parsedUpdates = messageSchema.partial().parse(updates);
  } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
  }

  if (parsedUpdates.message) {
    parsedUpdates.message = cleanRichText(parsedUpdates.message);
  }

  try {
    return await MessageModel.updateMessage(id, parsedUpdates);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}

export async function removeMessage(id: string, sessionUserId: string | null) {
  const message = await getMessageById(id);
  if (message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  try {
    await MessageModel.deleteMessage(id);
    return true;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}