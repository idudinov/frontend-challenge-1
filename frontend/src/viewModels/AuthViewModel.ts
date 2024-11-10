import logger from "@/logger";
import { callApi, storeCurrentUserIdForApi } from "@/services/api";
import { Api } from "@common/api";
import { LazyPromiseObservable } from "@zajno/common-mobx/lazy/observable";
import { ExpireTracker } from "@zajno/common/structures/expire";

export class AuthViewModel {
  public static readonly Instance = new AuthViewModel();

  private readonly _currentUserId = new LazyPromiseObservable<string | null>(async () => {
    try {
      const result = await callApi(Api.GetAuthState, {});
      const userId = result?.userId || null;
      storeCurrentUserIdForApi(userId);
      return userId;
    } catch (e) {
      logger.error("Failed to get auth state", e);
      return null;
    }
  }).withExpire(new ExpireTracker(1000 * 60 * 1));

  private constructor() {}

  public get isLoggedIn() {
    return !!this._currentUserId.value;
  }

  public get userInitials() {
    const userId = this._currentUserId.value;
    if (!userId) {
      return "";
    }

    return userId.slice(0, 2).toUpperCase();
  }

  public login = async () => {
    try {
      const { userId } = await callApi(Api.Login, {});
      this._currentUserId.setInstance(userId);
      storeCurrentUserIdForApi(userId);
    } catch (e) {
      logger.error("Failed to login", e);
    }
  };

  public logout = async () => {
    try {
      this._currentUserId.reset();
      storeCurrentUserIdForApi(null);
      await callApi(Api.Logout, {});
    } catch (e) {
      logger.error("Failed to logout", e);
    }
  };
}
