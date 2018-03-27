import axios from 'axios';
import config from '../config';

const openStackAxios = axios.create({
  baseURL: config.api.openStack,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

async function openStackService({ headers, method, url, data }) {
  try {
    let result;
    switch (method.toLowerCase()) {
      case 'get':
        result = await openStackAxios.get(url, { headers });
        break;
      case 'post':
        result = await openStackAxios.post(url, data);
        break;
      case 'delete':
        result = await openStackAxios.delete(url, { headers });
        break;
      case 'put':
        result = await openStackAxios.put(url, data, { headers });
        break;
      case 'patch':
        result = await openStackAxios.patch(url, data, { headers });
        break;
      default:
        result = await openStackAxios.get(url);
        break;
    }

    return result;
  } catch (error) {
    return Promise.reject(error.message || error);
  }
}

export { openStackService };
