import React, { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./Reducer";
import * as client from "./client";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client
      .findModulesForCourse(courseId ?? "")
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then(() => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const modulesList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <input
          className="form-control my-2"
          value={module.name}
          onChange={(e) =>
            dispatch(setModule({ ...module, name: e.target.value }))
          }
        />
        <textarea
          className="form-control my-2"
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }
        />
        <button
          className="btn btn-danger btn-sm float-end"
          //   onClick={() => dispatch(addModule({ ...module, course: courseId }))}
          onClick={handleAddModule}
        >
          Add
        </button>
        <button
          className="btn btn-danger btn-sm float-end"
          onClick={handleUpdateModule}
        >
          Update
        </button>
      </li>
      {modulesList
        .filter((module: any) => module.course === courseId)
        .map((module: any, index: any) => (
          <li key={index} className="list-group-item">
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => dispatch(setModule(module))}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleDeleteModule(module._id)}
            >
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
