import { FormEvent, useState } from "react";
import { createUserWithEmail } from "../lib/firebase/firebase_auth";

export default function Register() {
  const [error, setError] = useState<{ confirm_password: string }>({ confirm_password: "" });

  const handle_form_submission = async function (e: FormEvent) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement).entries());

    //Validating;
    if (formData["password"] !== formData["confirm_password"]) return setError((prev) => ({ ...prev, confirm_password: "Password Doesn't Match" }));

    //if all guard condition passed then error will be empty;
    setError({ confirm_password: "" });

    const user = {
      email: formData["email"] as string,
      password: formData["password"] as string,
      confirmPassword: formData["confirm_password"],
      display_name: formData["display_name"] as string,
    };

    console.log(user);
    console.log(e.currentTarget);
    createUserWithEmail({ email: user.email, password: user.password, display_name: user.display_name });
  };

  return (
    <div className="bg-dark-subtle p-4 col-10 col-sm-8 col-md-6  col-lg-5 col-xl-4  mx-auto mt-5 rounded-3">
      <div className="pb-4">
        <h2 className="text-center">Register</h2>
      </div>
      <form className="" onSubmit={handle_form_submission}>
        <div className="form-floating mb-3">
          <input type="text" required className="form-control" name="display_name" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Display Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" required className="form-control" name="email" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" required className="form-control" name="password" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" required className="form-control" name="confirm_password" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Confirm Password</label>
          {error.confirm_password ? <small className="text-danger d-inline-block">Password Doesn't Match</small> : <></>}
        </div>

        <div className="text-center pt-4">
          <button className="btn btn-success px-4">Login</button>
        </div>
      </form>
    </div>
  );
}
