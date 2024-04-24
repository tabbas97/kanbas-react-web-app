import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    role: "USER",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials)
      .then(() => {navigate("/Kanbas/Account/Profile");})
      .catch(() => window.alert("Unable to log in. Please enter valid credentials"))
      ;
  };

  const signup = async () => {
    navigate("/Kanbas/Account/Signup");
  };

  return (
    <div className="m-2">
      <h1>Sign in</h1>
      <div className="col-md-3 col-md-offset-3 text-center">
        <div className="col">
          <input
            className="form-control m-2"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            className="form-control m-2"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary" onClick={signin}>
          Sign in
        </button>
        <button className="btn btn-primary" onClick={signup}>
          Sign up
        </button>
      </div>
    </div>
  );
}
