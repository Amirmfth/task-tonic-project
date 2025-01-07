import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {status} = useSession()

  useEffect(() => {
    if(status === "authenticated") {
      router.replace("/")
    }
  } , [status])

  //handlers
  const loginHandler = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) {
      toast.success("Login successfully");
      router.push("/");
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        onClick={loginHandler}
        className="hover:-translate-y-1  hover:shadow-md duration-200"
        disabled={loading}
      >
        {loading && <ClipLoader size={20} />}
        <span className="ml-2">Login</span>
      </button>
      <div>
        <p className="mr-2">Create an account?</p>
        <Link href={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
