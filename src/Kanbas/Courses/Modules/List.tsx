import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./Reducer";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = useSelector((state: KanbasState) => state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) => state.modulesReducer.module);
    const dispatch = useDispatch();

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <input className="form-control my-2"
                    value={module.name}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    } />
                <textarea className="form-control my-2"
                    value={module.description}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, description: e.target.value }))
                    } />
                <button className="btn btn-danger btn-sm float-end"
                    onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                    Add
                </button>
                <button className="btn btn-danger btn-sm float-end"
                    onClick={() => dispatch(updateModule(module))}>
                    Update
                </button>
            </li>
            {modulesList
                .filter((module : any) => module.course === courseId)
                .map((module : any, index : any) => (
                    <li key={index} className="list-group-item">
                        <button className="btn btn-danger btn-sm float-end"
                            onClick={() => dispatch(setModule(module))}>
                            Edit
                        </button>
                        <button className="btn btn-danger btn-sm float-end"
                            onClick={() => dispatch(deleteModule(module._id))}>
                            Delete
                        </button>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                    </li>
                ))}
        </ul>
    );
}
export default ModuleList;