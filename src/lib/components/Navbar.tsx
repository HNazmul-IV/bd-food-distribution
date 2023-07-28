import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContextData } from "../context/UserContext";
import { logout } from "../firebase/firebase_auth";

export default function Navbar() {
  const { user } = useContext(UserContextData);
  return (
    <>
      <nav className="navbar position-fixed w-100 top-0 navbar-expand-lg bg-body-tertiary border-bottom" style={{ zIndex: 9999 }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item"></li>
            </ul>
          </div>
          {user?.email ? (
            <>
              <div className="d-flex align-items-center">
                <h5 className="me-2">{user.displayName}</h5>
                <button onClick={logout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="">
              <Link to="/login" className="btn btn-primary px-3 me-2">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-outline-primary ">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="w-100 pt-5"></div>
    </>
  );
}
