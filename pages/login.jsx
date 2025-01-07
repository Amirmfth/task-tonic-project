import LoginPage from "@/components/templates/LoginPage";
import { getSession } from "next-auth/react";
import React from "react";

function login() {
  return <LoginPage />;
}

export default login;

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
    props: {  },
  };
}
