export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// เก็บข้อมูลไว้ในหน่วยความจำชั่วคราว
const messages: ContactMessage[] = [];

export function addMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt'>
) {
  const item: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  messages.push(item);

  return item;
}

export function getMessages() {
  return messages;
}