import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">News Feed</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
          <button className="btn btn-active" onClick={() => router.push("/register")}>Register</button>
          <button className="btn" onClick={() => router.push("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
