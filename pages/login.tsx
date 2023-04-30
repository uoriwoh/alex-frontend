import { useState } from "react";
import AuthWrapper from "@/components/authWrapper";

export default function Login() {
  function action(e: React.MouseEvent<HTMLElement>) {}

  return (
    <AuthWrapper
      header="Login"
      title="Sign in below to access your account"
      query="Don't have an account yet?"
      queryLink="/register"
      queryTitle="Register"
      action={action}
    >
      <input type="email" placeholder="Enter email" className="input w-full" />
      <input
        type="password"
        placeholder="Enter password"
        className="input w-full mt-5"
      />
    </AuthWrapper>
  );
}

Login.authPage = true;
