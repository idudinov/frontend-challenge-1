import { LazyPromise } from "@zajno/common/lazy/promise";
import { ExpireTracker } from "@zajno/common/structures/expire";
import { readFile, writeFile } from 'node:fs/promises';
import { getFilePath } from "./utils.js";
import type { FileInfo } from "@mano/common/models/file.js";

type StorageState = {
  files: FileInfo[];
}

const StorageStatePath = getFilePath('_state');

export const CachedStorageState = new LazyPromise<StorageState>(async () => {
  try {
    const data = await readFile(StorageStatePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { files: [] };
  }
}).withExpire(new ExpireTracker(1000 * 60));

async function saveState(state: StorageState) {
  CachedStorageState.setInstance(state);
  await writeFile(StorageStatePath, JSON.stringify(state));
}

export async function storeFileToState(file: FileInfo) {
  const state = await CachedStorageState.promise;
  state.files.push(file);

  await saveState(state);
}
