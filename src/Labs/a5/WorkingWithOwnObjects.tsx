import React, { useState } from "react";
function WorkingWithOwnObjects() {
  const [module, setModule] = useState({
    id: 2,
    name: "NodeJS",
    description:
      "NodeJS is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    course: "Web Development",
  });

  const MODULE_URL = "http://localhost:4000/a5/module";

  return (
    <div>
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>
      <a href={`${
        MODULE_URL
      }/name/${module.name}`}>Update Name</a>
        <input
            type="text"
            onChange={(e) =>
            setModule({ ...module, name: e.target.value })
            }
            value={module.name}
        />

        <h4>Retrieving Objects</h4>
        <a className="btn btn-primary" href={MODULE_URL}>
            Get Module
        </a>
        <h4>Retrieving Properties</h4>
        <a
            className="btn btn-primary"
            href={`${MODULE_URL}/name`}
        >
            Get Name
        </a>
    </div>
  );
}
export default WorkingWithOwnObjects;
