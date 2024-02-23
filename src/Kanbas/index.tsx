import { Navigate, Route, Routes } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Nav from "../Nav";
import Dashboard from "./Dashboard";
function Kanbas() {

    // Load image from public folder

    const img_name = "spaceship-design.jpg";
    
    return (
        <div className="d-flex">
            <KanbasNavigation />
            <div style={{ flexGrow: 1 }}>
                {/* <h1>Account</h1>
                <h1>Dashboard</h1>
                <h1>Courses</h1> */}

                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account" element={<h1>Account</h1>} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Courses/:courseId/*" element={<Courses />} />
                    {/* <Route path="/assets/images/*" element={<img src={ */}
                        {/* new URL("./assets/images/spaceship-design.jpg", import.meta.url).toString() */}
                    {/* } />} /> */}
                </Routes>

            </div>
            {/* <Link to="/Labs/a3">A3</Link> |
            <Link to="/Kanbas">Kanbas</Link> |
            <Link to="/hello">Hello</Link> | */}
            {/* <Nav />
            <h1>Kanbas</h1> */}
        </div>
    )
}
export default Kanbas;
