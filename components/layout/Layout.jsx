import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import {BiMessageSquareAdd} from "react-icons/bi"
import {RxDashboard} from "react-icons/rx"

function Layout({ children }) {
  return (
    <div >
      <header>
        <p>
          TaskTonic |
          <span className="text-lg font-medium"> your daily todo handler</span>
        </p>
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
