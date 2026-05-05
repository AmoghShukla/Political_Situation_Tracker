"use client";

import axios from "axios";

import { useAuthStore } from "@/store/auth-store";
import type { ApiResponse, User } from "@/types/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1",
  timeout: 15_000
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = useAuthStore.getState().refreshToken;
    if (error.response?.status === 401 && refreshToken && !original._retry) {
      original._retry = true;
      const response = await axios.post<ApiResponse<{ access_token: string; refresh_token: string }>>(`${api.defaults.baseURL}/auth/refresh`, { refresh_token: refreshToken });
      useAuthStore.getState().setSession(response.data.data.access_token, response.data.data.refresh_token);
      original.headers.Authorization = `Bearer ${response.data.data.access_token}`;
      return api(original);
    }
    if (error.response?.status === 401) useAuthStore.getState().logout();
    return Promise.reject(error);
  }
);

export async function fetchMe() {
  const { data } = await api.get<ApiResponse<User>>("/auth/me");
  useAuthStore.getState().setUser(data.data);
  return data.data;
}
