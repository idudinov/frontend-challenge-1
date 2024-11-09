import { buildApiCaller } from "@zajno/common/api";
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const callApi = buildApiCaller<object>({
  request: (config) => {
    return axios.request(config);
  },
});
