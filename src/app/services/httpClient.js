import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

import { toastError } from '@/plugins/toasted';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_SyNzxPBoL';
const appSecret = 'a367e377a745436ba078f8870a6d5568';
const dbCollections = ['courses', 'students'];

const cacheConfig = {
  enabledByDefault: false,
  cacheFlag: 'useCache'
};

const config = {
  baseURL: baseUrl,
  headers: {
    'Cache-Control': 'no-cache'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig)
};

const http = axios.create(config);

const authInterceptor = function(config) {
  if (
    (config.url === 'login' || config.url === '') &&
    config.method === 'post'
  ) {
    config.baseURL = `${baseUrl}/user/${appKey}`;
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`)
    };
  } else {
    const token = localStorage.getItem('authtoken');

    config.baseURL = dbCollections.some(c => config.url.includes(c))
      ? `${baseUrl}/appdata/${appKey}`
      : `${baseUrl}/user/${appKey}`;
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: 'Kinvey ' + token
    };
  }
  return config;
};

const loggerInterceptor = config => {
  return config;
};

// Adding the request interceptors
http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

// Adding the response interceptors
const errorInterceptor = function(error) {
  if (error.response.status === 401) {
    toastError(
      `${error.response.statusText}: ${error.response.data.description}`
    );
  } else if (error.response.status === 500) {
    toastError(`${error.response.statusText}: Server Error`);
  } else if (error.response.status === 409) {
    toastError(`${error.response.statusText}: Username is already used`);
  } else {
    toastError(`${error.response.statusText}`);
  }

  return Promise.reject(error);
};

const responseInterceptor = function(response) {
  return response;
};

http.interceptors.response.use(responseInterceptor, errorInterceptor);

export { http };
