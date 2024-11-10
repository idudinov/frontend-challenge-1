import logger from "@/logger";
import { callApi } from "@/services/api";
import { Api } from "@common/api";
import { FileInfo } from "@common/models/file";
import { LazyPromiseObservable } from "@zajno/common-mobx/lazy/observable";
import { ExpireTracker } from "@zajno/common/structures/expire";

const SharedFilesListLoader = new LazyPromiseObservable<FileInfo[]>(async () => {
  try {
    return await callApi(Api.ListMRFs, {});
  } catch (e) {
    logger.error("Failed to load MRF files", e);
    return undefined;
  }
}).withExpire(new ExpireTracker(1000 * 60 * 1));

export class MRFFilesViewModel {

  public get items() {
    return SharedFilesListLoader.value;
  }
}
