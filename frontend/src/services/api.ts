import { UserIdHeaderKey } from "@common/models/user";
import { ValueModel } from "@zajno/common-mobx/viewModels/ValueModel";
import { buildApiCaller } from "@zajno/common/api";
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const callApi = buildApiCaller<object>({
  request: (config) => {
    return axios.request(config);
  },
});

const storageKey = 'mano-user-id';

const _currentUserId = new ValueModel<string | null>(window.localStorage.getItem(storageKey) || null);

export function storeCurrentUserIdForApi(userId: string | null) {
  _currentUserId.value = userId;
  if (userId) {
    window.localStorage.setItem(storageKey, userId);
  } else {
    window.localStorage.removeItem(storageKey);
  }
}

axios.interceptors.request.use(cfg => {
  if (_currentUserId.value) {
    cfg.headers[UserIdHeaderKey] = _currentUserId.value;
  }
  return cfg;
})
