import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import * as db from "../../Database";
import { assignments } from "../../Database";
import AssignmentsList from "./List";

function Assignments() {
    const { courseId } = useParams();
    const assignments = db.assignments;
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    // console.log(assignmentList);

    return (
        <div className="row">
            {/* <div className="justify-content-between" >
                <h2 className="me-3 wd-assignments-section-title border border-1 border-bottom-0">Course Assignments - {courseId}</h2>
                <button className="btn btn-primary">
                    <FaPlusCircle /> Add Assignment
                </button>
            </div> */}

            <AssignmentsList />

            {/* <div className="list-group">
                {assignmentList.map((assignment) => (
                    <Link 
                        key={assignment._id}
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="list-group-item me-3">
                            {assignment.title}
                    </Link>
                ))}
            </div> */}
        </div>
    )
}
export default Assignments;