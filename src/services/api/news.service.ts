import axios, { type AxiosRequestConfig } from 'axios';
import type { INews } from '../../shared/types/types';

const baseURL = import.meta.env.VITE_LOCAL_URL as string;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string;

const api = axios.create({
    baseURL,
    headers: {
        'X-Api-Key': API_KEY
    },
    withCredentials: false
});

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: unknown;
    timeout?: number;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
};

async function request<T = unknown>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = 'GET', data, timeout, headers, params } = options;
    const config: AxiosRequestConfig = {
        url,
        method,
        data,
        timeout,
        headers,
        params
    };
    const res = await api.request<T>(config);
    return res.data as T;
}

export const getTopHeadlines = (params?: {
    page?: number;
    pageSize?: number;
}): Promise<INews> =>
    request<INews>('/top-headlines', {
        params: {
            country: 'us',
            page: params?.page || 1,
            pageSize: params?.pageSize || 6
        }
    });

export const getCategoryHeadlines = (
    category: string,
    params?: { page?: number; pageSize?: number }
): Promise<INews> =>
    request<INews>('/top-headlines', {
        params: {
            country: 'us',
            category,
            page: params?.page || 1,
            pageSize: params?.pageSize || 6
        }
    });
