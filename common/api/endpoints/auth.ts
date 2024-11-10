import { UserInfo } from "../../models/user.js";
import { ApiPrefix } from "./_base.js";
import { ApiEndpoint } from "./_extend.js";


export const GetAuthState = ApiEndpoint.get<UserInfo | null>()
  .withPath(ApiPrefix, 'auth/state');

export const Login = ApiEndpoint.post<null, UserInfo>()
  .withPath(ApiPrefix, 'auth/login');

export const Logout = ApiEndpoint.post<null, null>()
  .withPath(ApiPrefix, 'auth/logout');
