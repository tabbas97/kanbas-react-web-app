import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import AssignmentEditor from "./Courses/Assignments/Editor";

function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;
    const findAllCourses = async () => {
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    }
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "rocket-prop.jpg"
    });
    const updateCourse = async () => {
        await axios.put(`${COURSES_API}/${course._id}`, course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };
    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([...courses, response.data ]);
    };
    const deleteCourse = async (courseId: string) => {
        await axios.delete(`${COURSES_API}/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
    }
    return (
        <Provider store={store}>
            <div className="d-flex">
                <KanbasNavigation />
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route path="Dashboard" element={
                            <Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse} />
                        } />
                        <Route path="Courses/:courseId/*" element={<Courses/>} />
                        <Route path="Courses/:courseId/Assignments/:assignmentId" element={<AssignmentEditor />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    )
}
export default Kanbas;
