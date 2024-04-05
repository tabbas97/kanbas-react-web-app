import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
  const API = "https://kanbas-node-server-app-367k.onrender.com/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const removeTodo = async (todo: { id: any }) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const deleteTodo = async (todo: { id: any }) => {
    try {
      await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const updateTodo = async () => {
    try {
      await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a className="m-2 btn btn-primary" href={API}>
        Get Todos
      </a>

      <button className="btn btn-primary m-2" onClick={postTodo}>
        Post Todo
      </button>
      <button className="btn btn-primary m-2" onClick={updateTodo}>
        Update Todo
      </button>

      <h4>Displaying Array Items</h4>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input
              className="m-2 form-check"
              checked={todo.completed}
              type="checkbox"
              readOnly
            />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              className="btn btn-primary m-2"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>
            {todo.title}
          </li>
        ))}
      </ul>

      <button className="btn btn-primary m-2" onClick={createTodo}>
        Create Todo
      </button>

      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        className="form-control m-2"
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <textarea
        className="form-control m-2"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />

      <input
        className="form-control m-2"
        value={todo.due}
        type="date"
        onChange={(e) => setTodo({ ...todo, due: e.target.value })}
      />
      <label>
        <input
          className="form-check m-2"
          checked={todo.completed}
          type="checkbox"
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
      </label>

      <button
        onClick={() => deleteTodo(todo)}
        className="btn btn-danger float-end ms-2"
      >
        Delete
      </button>

      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <button onClick={updateTitle} className="btn btn-primary m-2">
        Update Title
      </button>
      <h3>Updating an Item in an Array</h3>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <a className="btn btn-primary" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>

      <h3>Update completed status on ID</h3>
      <input
        type="checkbox"
        className="m-2 form-check"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed
      </a>

      <h3>Update Description</h3>
      <input
        type="text"
        className="form-control"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>
    </div>
  );
}
export default WorkingWithArrays;
