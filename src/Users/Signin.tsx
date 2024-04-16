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
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };

    return (
        <div className="row m-2">
            <h1>Sign in</h1>
            <input className="form-control m-2" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input className="form-control m-2" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={signin}>Sign in</button>
        </div>
    );
}