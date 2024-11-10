import type { FileInfo, FileMeta } from "@mano/common/models/file.js";
import { readFile, writeFile } from "node:fs/promises";
import { getFilePath } from "./utils.js";
import { CachedStorageState, storeFileToState } from "./state.js";

export async function saveFile(contents: string, id: string, name?: string, ownerId?: string, meta?: FileMeta) {
  const file: FileInfo = {
    id,
    name,
    ownerId: ownerId ?? "",
    createdAt: new Date(),
    meta,
  };

  try {
    await writeFile(getFilePath(id), contents);
  } catch (e) {
    return null;
  }

  await storeFileToState(file);

  return file;
}

export async function listFiles(ownerId?: string) {
  const state = await CachedStorageState.promise;
  return ownerId ? state.files.filter((f) => f.ownerId === ownerId) : state.files;
}

export async function getFile(id: string) {
  try {
    return await readFile(getFilePath(id), "utf8");
  } catch (e) {
    return null;
  }
}
