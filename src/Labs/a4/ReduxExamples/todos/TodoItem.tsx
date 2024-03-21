import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { LabState, TodoType } from "../../../store";

function TodoItem({todo}: {todo: TodoType}) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item">
            <button onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
            <button onClick={() => dispatch(setTodo(todo))}> Edit </button>
            {todo.title}
        </li>
    );
}
export default TodoItem;