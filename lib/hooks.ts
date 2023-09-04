import useSWR from "swr";
import { fetcher } from "./lib";
import { getCookie } from "cookies-next";

export function usePosts() {
  const { data, mutate, error, isLoading } = useSWR(
    "post/get-user-posts",
    fetcher
  );
  return { data, mutate, error, isLoading };
}

export function useComments() {
  const { data, mutate } = useSWR("post/get-comments", fetcher);
  return { data, mutate };
}

export function useUser() {
  getCookie("token")
  const { data, isLoading } = useSWR("auth/get-user", fetcher);
  return { data, isLoading };
}

export function useAllPosts(id: any) {
  const { data } = useSWR(`post/all-posts?id=${id}`, fetcher);
  return { data };
}

export function useAllUsers() {
  const { data } = useSWR("auth/all-users", fetcher);

  return { data };
}
