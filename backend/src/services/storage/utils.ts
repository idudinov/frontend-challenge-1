import * as Path from 'node:path';

const BASE_PATH = Path.resolve(process.cwd(), 'storage');

export const getFilePath = (id: string) => Path.resolve(BASE_PATH, id + '.json');
