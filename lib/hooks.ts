import useSWR from "swr";
import { fetcher } from "./lib";

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
  const { data, isLoading } = useSWR("auth/get-user", fetcher);
  return { data, isLoading };
}

export function useAllPosts() {
  const { data } = useSWR("post/all-posts", fetcher);
  return { data };
}

export function useAllUsers() {
  const { data } = useSWR("auth/all-users", fetcher);

  return { data };
}
