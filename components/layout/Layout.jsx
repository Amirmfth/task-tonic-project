import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Layout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  // handlers
  const logoutHandler = async () => {
    signOut();
  };

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status]);
  return (
    <div>
      <header>
        <p>
          TaskTonic |
          <span className="text-lg font-medium"> your daily todo handler</span>
        </p>
        {status === "authenticated" && (
          <button onClick={logoutHandler}>
            Logout
            <FiLogOut />
          </button>
        )}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href={"/"}>Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href={"/add-todo"}>Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
