import { randomUUID } from 'node:crypto';

export async function createUser() {
  return { userId: randomUUID() };
}
