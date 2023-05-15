import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/lib/hooks";
import { fetcher } from "@/lib/lib";

export default function NavBar() {
  const router = useRouter();
  const { data } = useUser();

  async function logout() {
    await fetcher("auth/logout");
    router.push("/");
  }

  return (
    <div className="navbar bg-base-100 flex justify-between md:flex-row flex-col">
      <div className="flex justify-between gap-2 pt-3 md: md:gap-28">
        <div>
          <div>
            <NextLink
              href="/"
              className="btn btn-ghost normal-case text-3xl font-bold"
            >
              News Feed
            </NextLink>
          </div>
        </div>
        <div className="form-control"></div>
      </div>
      {!data?.message?.id ? (
        <div className="flex-none gap-2 order-first md:order-last">
          <div className="btn-group btn-group-horizontal">
            <button
              className="btn bg-green-400 text-black hover:bg-black hover:text-green-400"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
            <button className="btn" onClick={() => router.push("/login")}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={data?.message?.imageUrl}
                alt="User photo"
                width={200}
                height={200}
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {!(data?.message?.role === "Admin") && (
              <li>
                <NextLink href="/my-posts">My Posts</NextLink>
              </li>
            )}
            {/* {!(data?.message?.role === "Admin") && (
              <li>
                <NextLink href="/my-posts">My Posts</NextLink>
              </li>
            )} */}
            {data?.message?.role === "User" && (
              <li>
                <NextLink href="/profile">Profile</NextLink>
              </li>
            )}
            {data?.message?.role === "Admin" && (
              <li>
                <NextLink href="/all-users">Users</NextLink>
              </li>
            )}
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
