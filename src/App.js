import React from "react";

import { TodoCounter } from "./TodoCounter.js";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js";

// import "./App.css";

const todos = [
  {
    text: "Pagar el internet",
    completed: false,
  },
  {
    text: "Cambiar dólares",
    completed: false,
  },
  {
    text: "Reparar el celular",
    completed: true,
  },
];

function App(props) {
  // El componente App maneja el estado, el cual lo pasa a todos los componentes hijos

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
