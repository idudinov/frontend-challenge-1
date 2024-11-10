import logger from "@/logger";
import { callApi } from "@/services/api";
import { Api } from "@common/api";
import { LazyPromiseObservable } from "@zajno/common-mobx/lazy/observable";

export class MRFFilesViewModel {

  private readonly _items = new LazyPromiseObservable<string[]>(async () => {
    try {
      return await callApi(Api.ListMRFs, {});
    } catch (e) {
      logger.error("Failed to load MRF files", e);
    }
  });

  public get items() {
    return this._items.value;
  }
}
