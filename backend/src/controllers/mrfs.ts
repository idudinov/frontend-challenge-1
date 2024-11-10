import { listFiles } from "../services/storage/index.js";

export async function listMrfFileIds() {
  const files = await listFiles();
  return files.map(f => f.id);
}
