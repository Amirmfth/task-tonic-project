import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function SignupPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await axios
        .post("/api/auth/signup", { email, password, name, lastName })
        .then((res) => res.data);
      return res;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      router.push("/login");
    },
  });

  // handlers
  const signupHandler = async () => {
    signupMutation.mutate();
  };

  return (
    <div className="signin-form">
      <h3>Registration Form</h3>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
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
        onClick={signupHandler}
        className="hover:-translate-y-1  hover:shadow-md duration-200"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending && <ClipLoader size={20} />}
        <span className="ml-2">Register</span>
      </button>
      <div>
        <p className="mr-2">Have an account?</p>
        <Link href={"/login"}>Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
