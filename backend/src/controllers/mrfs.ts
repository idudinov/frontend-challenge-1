import type { FileInfo } from "@mano/common/models/file.js";
import { listFiles } from "../services/storage/index.js";

export async function listMrfFileIds(): Promise<FileInfo[]> {
  const files = await listFiles();
  return files;
}
