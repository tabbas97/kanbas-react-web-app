import React, { useState, useEffect } from "react";
import {
  BsTrashFill,
  BsPlusCircleFill,
  BsFillCheckCircleFill,
  BsPencil,
} from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    role: "USER",
    firstName: "",
    lastName: "",
  });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.error(err);
    }
  };
  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.error(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.error(err);
    }
  };

  const [role, setRole] = useState<string>("USER");
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUserByRole(role);
    setRole(role);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-control w-25 float-end m-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <h1 className="m-2">User Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <input
                value={user.username}
                placeholder="Username"
                className="form-control mt-2"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <input
                value={user.password}
                className="form-control mt-2"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.firstName}
                placeholder="First Name"
                className="form-control mt-2"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={user.lastName}
                placeholder="Last Name"
                className="form-control mt-2"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.role}
                className="form-control mt-2"
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td className="text-nowrap">
              <BsFillCheckCircleFill
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
              />
              <BsPlusCircleFill className="me-2 text-success fs-1 text" onClick={createUser} />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td className="text-nowrap">
                <button className="btn btn-danger me-2">
                  <BsTrashFill onClick={() => deleteUser(user)} />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
