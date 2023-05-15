const baseurl = "http://localhost:3333/";

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

export async function fetcher(url: string, data: DataProps = undefined) {
  const res = await fetch(`${baseurl}${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
  await fetch("http://localhost:3333/post/upload", {
    method: "post",
    credentials: "include",
    body: formData,
  });
}

export async function uploadProfilePic(formData: any) {
  await fetch("http://localhost:3333/auth/upload-image", {
    method: "post",
    credentials: "include",
    body: formData,
  });
}
