import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
    _id: "",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="m-2 row">
      <h1>Profile</h1>
      <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-90 m-2">
        Users
      </Link>
      {profile && (
        <div className="form-control row">
          <input
            className="form-control m-2"
            value={profile.username}
            placeholder="Username"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            value={profile.password}
            className="form-control m-2"
            placeholder="Password"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            value={profile.firstName}
            className="form-control m-2"
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            value={profile.lastName}
            className="form-control m-2"
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            value={profile.dob}
            className="form-control m-2"
            placeholder="Date of Birth"
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            value={profile.email}
            className="form-control m-2"
            placeholder="Email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            value={profile.role}
            className="form-control m-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
      <div>
        <button className="btn btn-primary m-2" onClick={save}>Save</button>
        <button className="btn btn-primary m-2" onClick={signout}>Signout</button>
      </div>
    </div>
  );
}
