import React from "react";
import { Link, useLocation } from "react-router-dom";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void;
        }
) {
    
    console.log(useLocation().pathname);
    return (
        <div className="row p-4">
            <h1>Dashboard</h1> <hr />
            <h5>Course</h5>
            <div className="px-2">
                <input value={course.name} className="form-control"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <input value={course.number} className="form-control"
                    onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                <input value={course.startDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                <input value={course.endDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
                <div className="col my-2">
                    <button className="btn btn-danger btn-sm float-end" onClick={addNewCourse} >
                        Add
                    </button>
                    <button className="btn mx-2 btn-danger btn-sm float-end" onClick={updateCourse} >
                        Update
                    </button>
                </div>
            </div>
            <h2>Published Courses (12)</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} style={{ textDecoration: "none", color: "navy" }}>
                                <div className="card">
                                    <img className="card-img-top" style={{ height: 150 }} alt={course.name}
                                        src={require("../assets/images/" + course.image)}
                                    />
                                    {/* <img src={`/assets/images/spaceship-design.jpg`} className="card-img-top" style={{ height: 150 }} /> */}
                                    <div className="card-body">
                                        <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                            {course.name} </Link>
                                        {/* <button onClick={() => deleteCourse(course._id)} className="btn btn-danger btn-sm float-end">Delete</button> */}
                                        <div className="card-text col">
                                            <p className="card-text">{course.name}</p>
                                            <div className="card-text col">
                                                <button className="btn btn-danger btn-sm float-end" onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm float-end" onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
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