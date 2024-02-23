import React from "react";
import { Link, useLocation } from "react-router-dom";
import { courses } from "../Database";
function Dashboard() {
    console.log(useLocation().pathname);
    return (
        <div className="p-4">
            <h1>Dashboard</h1> <hr />
            <h2>Published Courses (12)</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} style={{ textDecoration: "none", color: "navy" }}>
                                <div className="card">
                                    <img className="card-img-top" style={{ height: 150 }} alt = {course.name}
                                        src={require("../assets/images/" + course.image)}
                                    />
                                    {/* <img src={`/assets/images/spaceship-design.jpg`} className="card-img-top" style={{ height: 150 }} /> */}
                                    <div className="card-body">
                                        <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                            {course.name} </Link>
                                        <p className="card-text">{course.name}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;

// <img src={`./images/${course.image}`} className="card-img-top" style={{ height: 150 }} />