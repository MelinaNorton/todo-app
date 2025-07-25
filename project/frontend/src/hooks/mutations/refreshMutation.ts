import { AxiosError } from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from "@/resources/context/authContext";
import { api } from "@/resources/helpers/publicResources";

 
export function useRefresh() {
  const { setToken } = useAuth();

  return async function refresh(): Promise<string | undefined> {
    try {
      const resp = await api.post<string>('/Token/refresh');
      setToken(resp.data);
      return resp.data;
    } catch (err) {
      console.error('Error refreshing token', err as AxiosError);
      return undefined;
    }
  };
}