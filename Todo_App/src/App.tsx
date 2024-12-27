import React, { useState } from "react";
import { Todo } from "./types/todo";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  
  React.useEffect(() => {
    console.log("Todos after update:", todos);
  }, [todos]);
  

  const addTodo = () => {
    if (title.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTitle("");
    }
  };

  const deleteTodo = (id: number) => {
    console.log("Deleting Todo with ID:", id);
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log("Updated Todos:", todos);
  };
  

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>TODO App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => toggleComplete(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
