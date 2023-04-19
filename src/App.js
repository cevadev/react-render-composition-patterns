import React from "react";

import { TodoCounter } from "./TodoCounter.js";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js";

// import "./App.css";

const defaultTodos = [
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
    completed: false,
  },
];

function App(props) {
  // El componente App maneja el estado, el cual lo pasa a todos los componentes hijos
  // almacenamos el state en searchValue
  // setSearchValue es una funcion que actualiza el state de la app
  const [searchValue, setSearchValue] = React.useState("");

  // manejamos el estado de los to-do
  const [todos, setTodos] = React.useState(defaultTodos);

  // filtramos los todos cuya propiedad completed es true (!!) y los contamos (lenght)
  const completedTodos = todos.filter((todo) => {
    return !!todo.completed;
  }).length;

  const totalTodos = todos.length;

  let searchedTodos = [];
  if (!(searchValue.length >= 1)) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  return (
    <React.Fragment>
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo) => (
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
