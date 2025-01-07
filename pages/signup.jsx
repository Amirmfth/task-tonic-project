import SignupPage from "@/components/templates/SignupPage";
import { getSession } from "next-auth/react";

function Signup() {
  return <SignupPage />;
}

export default Signup;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  return {
    props: { },
  };
}