export interface User {
  id: string;
  email: string;
  password: string;
}

// ข้อมูลผู้ใช้จำลอง
const users: User[] = [
  {
    id: '1',
    email: 'admin@tsu.ac.th',
    password: '1234',
  },
];

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) ?? null;
}