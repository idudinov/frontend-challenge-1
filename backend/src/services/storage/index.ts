import { LazyPromise } from "@zajno/common/lazy/promise";
import { ExpireTracker } from "@zajno/common/structures/expire";
import { readFile, writeFile } from 'node:fs/promises';
import * as Path from 'node:path';

type StorageFile = {
  id: string;
  name?: string;
  ownerId?: string;
}

type StorageState = {
  files: StorageFile[];
}

const getFilePath = (id: string) => Path.resolve(process.cwd(), 'storage', id + '.json');
const StorageStatePath = getFilePath('_state');

const CachedStorageState = new LazyPromise<StorageState>(async () => {
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

export async function saveFile(contents: string, id: string, name?: string, ownerId?: string) {

  const file: StorageFile = { id, name, ownerId: ownerId ?? '' };

  try {
    await writeFile(getFilePath(id), contents);
  } catch (e) {
    return null;
  }

  const state = await CachedStorageState.promise;
  state.files.push(file);

  await saveState(state);

  return file;
}

export async function listFiles(ownerId?: string) {
  const state = await CachedStorageState.promise;
  return ownerId
    ? state.files.filter(f => f.ownerId === ownerId)
    : state.files;
}

export async function getFile(id: string) {
  try {
    return await readFile(getFilePath(id), 'utf8');
  } catch (e) {
    return null;
  }
}
