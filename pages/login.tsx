import { useState } from "react";
import NextLink from "next/link";
import AuthWrapper from "@/components/authWrapper";
import { fetcher } from "@/lib/lib";

export default function Login() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function action(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    setError("")
    if(!email || !password){
      setError("Please peovide email and password")
    }

    const state = {
      email, password
    }

    console.log(state)
  }

  return (
    <AuthWrapper
      header="Login"
      title="Sign in below to access your account"
      query="Don't have an account yet?"
      queryLink="/register"
      queryTitle="Register"
      action={action}
    >
      <input type="email" placeholder="Enter email" className="input w-full" 
        onChange={(e) => setEmail(e.target.value)}/>
      <input
        type="password"
        placeholder="Enter password"
        className="input w-full mt-5"
        onChange={(e) => setPassword(e.target.value)}
      />
       {error && <p className='mt-5 text-center'>{error}</p>}
    </AuthWrapper>
  );
}

Login.authPage = true;
