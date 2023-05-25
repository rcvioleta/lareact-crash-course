import { Link, Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../context/ContextProvider";

export default function DefaultLayout() {
  const { user, token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  function logoutHandler(evt) {
    console.log("[logoutHandler]", evt);
  }

  return (
    <div className="DefaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#logout" onClick={logoutHandler}>
              Logout
            </a>
          </div>
        </header>
      </div>
      <Outlet />
    </div>
  );
}
