
export type FileInfo = {
  id: string;
  name?: string;
  ownerId?: string;
  createdAt?: Date;
  meta?: FileMeta;
}

type MRFFileMeta = {
  type: 'MRF';
  initialCount: number;
  count: number;
}

export type FileMeta = MRFFileMeta;
