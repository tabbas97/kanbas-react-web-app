import React, { useState } from "react";
// import "./index.css";
import { assignments } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignment,
} from "./reducer";
import { KanbasState } from "../../store";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function AssignmentsList() {
    const { courseId } = useParams();
    const assignmentsList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();

    return (
        <div className="row">
            <div className="justify-content-between" >
                <h2 className="mt-4 wd-assignments-section-title border border-1 border-bottom-0">Course Assignments - {courseId}</h2>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/new`}>
                        <button className="btn btn-primary mt-2 mb-2 floating-end" >
                        <FaPlusCircle /> Add Assignment
                        </button>
                </Link>
            </div>

            <div className="list-group">
                {
                    assignmentsList
                        .filter((assignment) => assignment.course === courseId)
                        .map((assignment) => (
                            <div key={assignment._id} className="list-group-item me-3">
                                <div className="row justify-content-between">
                                    <Link
                                        key={assignment._id}
                                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                                        className="list-group-item col-8 me-3">
                                        {assignment.title}
                                    </Link>
                                    <button
                                        className="btn btn-danger col-2"
                                        onClick={() => dispatch(deleteAssignment(assignment._id))}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default AssignmentsList;
