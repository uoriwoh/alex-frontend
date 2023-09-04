import { getCookie } from "cookies-next";
export const baseurl = "https://news-feed-api-6f5f8106f92a.herokuapp.com/";

type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
};

type PostCommentProps = {
  postId: number;
  content: string;
};

type DeleteCommentProps = {
  id: number;
};

type deleteUserProps = {
  id: string;
};

type editFirstNameProp = {
  newFName: string;
};

type editLastNameProp = {
  newLName: string;
};

type editDeptProp = {
  newDept: string;
};

export type DataProps =
  | RegisterProps
  | LoginProps
  | PostCommentProps
  | DeleteCommentProps
  | deleteUserProps
  | editFirstNameProp
  | editLastNameProp
  | editDeptProp
  | undefined;

export const token = getCookie('token')
export async function fetcher(url: string, data: DataProps = undefined) {
  const token = getCookie('token')
  const res = await fetch(`${baseurl}${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { message, statusCode } = await res.json();
    return { message, statusCode };
  }
  const { message, statusCode } = await res.json();
  return { message, statusCode };
}

export async function upload(formData: any) {
  await fetch(`${baseurl}post/upload`, {
    method: "post",
    credentials: "include",
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

export async function uploadProfilePic(formData: any) {
  await fetch(`${baseurl}auth/upload-image`, {
    method: "post",
    credentials: "include",
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

export async function fetchPosts(tracker: number) {
  const { data, totalNum } = (await fetcher(`post/all-posts?id=${tracker}`))
    .message;

  return { data, totalNum };
  // return (await fetcher(`post/all-posts?id=${tracker}`)).message.data;
}
