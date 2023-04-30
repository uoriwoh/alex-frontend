const baseurl = "http://localhost:3333/";

type RegisterProps = {
  firstName: string; lastName: string; email: string; department: string; password: string
}

type LoginProps = {
  email: string;
  password: string;
}

type DataProps = RegisterProps | LoginProps | undefined

export async function fetcher(url: string, data: DataProps = undefined) {
  try {
    const res = await fetch(`${baseurl}${url}`, {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (error) {
    return { error };
  }
}
