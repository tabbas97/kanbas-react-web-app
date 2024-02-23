import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = assignments.find(
        (assignment) => assignment._id === assignmentId);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div className="mt-5 align-items-center">
            <h2>Assignment Name</h2>
            <div className="d-flex flex-row align-items-center">
                <input value={assignment?.title}
                    className="form-control mb-2 align-items-center" />
                <div className="d-flex flex-row mt-2 align-items-center">
                    <button onClick={handleSave} className="btn btn-success ms-2 float-end align-items-center">
                        Save
                    </button>
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                        className="btn btn-danger float-end ms-2 align-items-center">
                        Cancel
                    </Link>
                </div>
            </div>
            <hr />
            <>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                        <h3>Assignment Details</h3>
                        <AssignmentEditForm />
                    </div>
                </div>
            </>
        </div>
    );
}

function AssignmentEditForm() {
    return (
        <div className="d-flex flex-column mx-4">
            <hr />
            <form action="/kanbas/courses/assignments/screen.html" className="mb-3">
                <div className="mb-3 align-items-center">
                    <label htmlFor="aname">Assignment Name</label><br /><br />
                    <input type="text" className="form-control" placeholder="Name of Assignment" /><br /><br />
                </div>

                <div className="mb-3 align-items-center">
                    <textarea name="adescr" id="adescr" cols={30} rows={5} className="form-control">This is the assignment description.</textarea>
                </div>

                <div className="row mb-3 align-middle" style={{ verticalAlign: 'middle' }}>
                    <label htmlFor="Points" className="col-form-label col-3 text-end">Points</label><br /><br />
                    <div className="col-5">
                        <input type="text" className="form-control" id="Points" /><br /><br />
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row mb-3 align-middle" style={{ verticalAlign: 'middle' }}>
                    <label htmlFor="agrps" className="col-form-label col-3 text-end">Assignment Group</label><br /><br />
                    <div className="col-5">
                        <select id="agrps" className="form-control">
                            <option>ASSIGNMENTS</option>
                            <option>Opt 1</option>
                            <option>Opt 2</option>
                        </select>
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row mb-3 align-middle" style={{ verticalAlign: 'middle' }}>
                    <label htmlFor="gdisp" className="col-form-label col-3 text-end">Display grade as</label><br /><br />
                    <div className="col-5">
                        <select id="gdisp" className="form-control">
                            <option>Percentage</option>
                            <option>Opt 1</option>
                            <option>Opt 2</option>
                        </select>
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row mb-3 align-middle" style={{ verticalAlign: 'middle' }}>
                    <label htmlFor="stype" className="col-form-label col-3 text-end">Submission Type</label><br /><br />
                    <div className="col-5">
                        <select id="stype" className="form-control">
                            <option>Online</option>
                            <option>Opt 1</option>
                            <option>Opt 2</option>
                        </select>
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row mb-3 align-middle" style={{ verticalAlign: 'middle' }}>
                    <label htmlFor="onlineEntry" className="col-form-label col-3 text-end">Online Entry Options</label><br /><br />
                    <div className="col-5">
                        <input type="checkbox" name="onlineEntry" value="checkbox" className="form-check-label" />Text Entry<br />
                        <input type="checkbox" name="onlineEntry" value="checkbox" className="form-check-label" />Website URL<br />
                        <input type="checkbox" name="onlineEntry" value="checkbox" className="form-check-label" />Media Recordings<br />
                        <input type="checkbox" name="onlineEntry" value="checkbox" className="form-check-label" />Student Annotation<br />
                        <input type="checkbox" name="onlineEntry" value="checkbox" className="form-check-label" />File Uploads<br />
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row mb-3">
                    <div className="col-3 text-end col-form-label">
                        Assign
                    </div>
                    <div className="col-5">
                        <div className="border rounded-top p-4">
                            <div className="row mb-3">
                                <label htmlFor="assign" className="form-label ellipsis">
                                    <h6>Assign to</h6>
                                </label>
                                <input type="text" className="form-control" id="assign" value="Everyone" />
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="due" className="form-label ellipsis">
                                    <h6>Due</h6>
                                </label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="due" value="May XX XXXX, 11:59 PM" />
                                    <span className="input-group-text">
                                        <i className="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="row" style={{ paddingBottom: '10px' }}>
                                <div className="col">
                                    <label htmlFor="afrom" className="form-label-ellipsis">
                                        <h6>Available from</h6>
                                    </label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="afrom" name="afrom" value="May XX XXXX, 12:00 AM" />
                                        <span className="input-group-text">
                                            <i className="fa-regular fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label htmlFor="atill" className="form-label-ellipsis">
                                        <h6>Until</h6>
                                    </label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="atill" name="atill" value="May XX XXXX, 12:00 AM" />
                                        <span className="input-group-text">
                                            <i className="fa-regular fa-calendar"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex border rounded-bottom border-top-0 justify-content-center align-items-center p-1 bg-light">
                            <a href="." style={{ textDecoration: 'none', color: 'black' }}>
                                <i className="fa-solid fa-plus me-1"></i>
                                Add
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default AssignmentEditor;
