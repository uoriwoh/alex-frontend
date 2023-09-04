import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import AuthWrapper from "@/components/authWrapper";
import { fetcher } from "@/lib/lib";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function action(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please peovide email and password");
    }

    const state = {
      email,
      password,
    };

    setLoading(true);
    const { message, statusCode } = await fetcher("auth/login", state);
    if (statusCode !== 201) {
      setLoading(false);
      setError(message);
      return;
    }

    setCookie("token", message.access_token);

    setLoading(false);

    router.push("/home");
  }

  return (
    <AuthWrapper
      header="Login"
      title="Sign in below to access your account"
      query="Don't have an account yet?"
      queryLink="/register"
      queryTitle="Register"
      action={action}
      loading={loading}
    >
      <input
        type="email"
        placeholder="Enter email"
        className="input w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="input w-full mt-5"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="mt-5 text-center">{error}</p>}
    </AuthWrapper>
  );
}

Login.prototype.authPage = true;
