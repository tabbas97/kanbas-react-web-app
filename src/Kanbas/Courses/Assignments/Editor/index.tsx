import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as db from "../../../Database";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { setAssignment, updateAssignment } from "../reducer";

function AssignmentEditor() {

    const { assignmentId } = useParams();
    const assignmentsList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = assignmentsList.find(
        (assignment) => assignment._id === assignmentId);

    const dispatch = useDispatch();
    
    const { courseId } = useParams();
    const navigate = useNavigate();

    const assignmentStartState = db.assignments.find(
        (assignment) => assignment._id === assignmentId);

    const handleCancel = () => {
        console.log("Cancelling assignment");
        console.log(assignmentStartState);
        dispatch(setAssignment(assignmentStartState));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    }
    
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    
    return (
        <div className="me-5">
            <h2>Assignment Name</h2>
            <input 
                value={assignment?.title} 
                className="form-control mb-2" 
                onChange={(e) => dispatch(updateAssignment({ ...assignment, title: e.target.value }))}
                />
            <hr/>
            <textarea 
                value={assignment?.description} 
                className="form-control mb-2" 
                onChange={(e) => dispatch(updateAssignment({ ...assignment, description: e.target.value }))}
                />
            <hr/>
            
            <div className="row mb-3">
                <div className="col-4 col-form-label text-end">
                    <label>Points</label>
                </div>
                <div className="col-8">
                    <input 
                        type="number" 
                        value={assignment?.points} 
                        className="form-control mb-2" 
                        onChange={(e) => dispatch(updateAssignment({ ...assignment, points: e.target.value }))}
                        />
                </div>
            <div className="row mb-3">
                <div className="col-4 col-form-label text-end">
                    <label>Due Date</label>
                </div>
                <div className="col-8">
                    <input 
                        type="date" 
                        value={assignment?.dueDate} 
                        className="form-control mb-2" 
                        onChange={(e) => dispatch(updateAssignment({ ...assignment, dueDate: e.target.value }))}
                        />
                </div>
            </div>
            <div className="row mb-3 justify-content-end">
                <div className="col-4 col-form-label text-start">
                    <label>Available from</label>
                    <input
                        type="date"
                        value={assignment?.availableFrom}
                        className="form-control"
                        onChange={(e) => dispatch(updateAssignment({ ...assignment, availableFrom: e.target.value }))}
                    />
                </div>
                <div className="col-4 col-form-label text-start">
                    <label>Available until</label>
                    <input
                        type="date"
                        value={assignment?.availableUntil}
                        className="form-control"
                        onChange={(e) => dispatch(updateAssignment({ ...assignment, availableUntil: e.target.value }))}
                    />
                </div>

            </div>

            </div>
            <div className="float-end me-2">
                {/* <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                    className="btn btn-danger ms-2">
                    Cancel
                </Link> */}
                <button onClick={handleCancel} className="btn btn-danger ms-2">
                    Cancel
                </button>
                <button onClick={handleSave} className="btn btn-success ms-2">
                    Save
                </button>
            </div>
        </div>
    );

}

export default AssignmentEditor;
