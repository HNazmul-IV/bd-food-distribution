import { useContext, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContextData } from "../lib/context/UserContext";
import { firebaseAuth, logout } from "../lib/firebase/firebase_auth";

const dashboard_nav_items = [
  {
    label: "Create A Post",
    link: "/dashboard/create-post",
  },
  {
    label: "Post List",
    link: "/dashboard/post-list",
  },

  {
    label: "Find Food",
    link: "/dashboard/create-post",
  },
  {
    label: "Edit Profile",
    link: "/dashboard/create-post",
  },
];

export default function DashboardLayout() {
  const { user } = useContext(UserContextData);
  const [page_loaded, set_page_loaded] = useState(false);

  const location = useLocation();
  useEffect(() => {
    // window.addEventListener("load", function () {
    //     firebaseAuth.authStateReady()

    //   set_page_loaded(true);
    // });
    firebaseAuth.authStateReady().then(() => set_page_loaded(true));
  }, []);


  return Object.keys(user || {}).length > 0 && user?.email ? (
    <>
      <div className="row pt-5 container-xl mx-auto">
        <div className="col-3">
          <div className="">
            <ul className=" px-0 bg-light ">
              <div className="pt-5 pb-3 text-center">
                <h3>
                  Bd Food <br /> Distribution
                </h3>
              </div>
              <div className="list-group p-2">
                {dashboard_nav_items.map((item) => (
                  <Link key={item.label} to={item.link} className="list-group-item list-group-item-action" aria-current="true">
                    {item.label}
                  </Link>
                ))}

                <div onClick={logout} className="list-group-item list-group-item-action">
                  logout
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </>
  ) : page_loaded && user === null ? (
    <Navigate to="/login" state={{ ...location }} />
  ) : (
    <h1>Loading ...</h1>
  );
}
