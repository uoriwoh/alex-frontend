const baseurl = "http://localhost:3333/";

type DataProps =
  | {
      name: string;
    }
  | undefined;

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
