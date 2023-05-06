import useSWR from "swr";
import { fetcher, DataProps } from "./lib";

// export function usePosts(pageDetails: DataProps) {
//   const { data, mutate, error, isLoading } = useSWR(
//     ["post/get-user-posts", pageDetails],
//     ([url, pageDetails]) => fetcher(url, pageDetails)
//   );

//   return { data, error, isLoading, mutate };
// }

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
  const { data } = useSWR("auth/get-user", fetcher);
  return { data };
}

export function useAllPosts() {
  const { data } = useSWR("post/all-posts", fetcher);
  return { data };
}

export function useAllUsers() {
  const { data } = useSWR("auth/all-users", fetcher);

  return { data };
}
