import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { AUTH_TOKEN_KEY } from '../const';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  );

  return api;
};
