import { FormEvent } from "react";
import { loginWithEmail } from "../lib/firebase/firebase_auth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const handle_form_submission = async function (e: FormEvent) {
    e.preventDefault();
    const form_data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement).entries());
    const user = {
      email: form_data["email"] as string,
      password: form_data["password"] as string,
    };
    loginWithEmail(user.email, user.password)
      .then(() => {
        // if (location.state) {
        //   navigate(location.state?.pathname);
        // }else {
        //   navigate
        // }

        navigate(location.state?.pathname || "/");
      })
      .catch((e) => Swal.fire("Login Failed", e.message, "error"));
  };
  return (
    <>
      <div className="bg-light-subtle p-4 col-10 col-sm-8 col-md-6  col-lg-5 col-xl-4  mx-auto mt-5 rounded-3">
        <div className="pb-4">
          <h2 className="text-center">Login</h2>
        </div>
        <form className="" onSubmit={handle_form_submission}>
          <div className="form-floating mb-3">
            <input type="email" required className="form-control" name="email" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" required className="form-control" name="password" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="text-center pt-4">
            <button className="btn btn-success px-4">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}
