import React from "react";

import { TodoCounter } from "./TodoCounter.js";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js";

// import "./App.css";

/**
 * 1. Tenemos un array de todos (defaultTodos)
 * 2. Contamos los todos marcados como completados (completedTodos)
 * 3. Contamos la cantidad de todos creados (totalTodos)
 * 4. Filtramos los todos dependiendo lo que escriban y lo colocamos en el array searchedTodos
 * 5. La funcion completeTodo cada vez que reciba un text va a buscar en la lista de todos cual
 *    de los todos coincide con el texto
 */

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
    completed: true,
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

  // funcion que completa un todo
  const completeTodo = (text) => {
    // encontramos la posicion de todo dentro de todos y que coincida con el input text
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    // clonamos la lista de todos
    const newTodos = [...todos];
    // basados en el todoIndex nos ubicamos en dicho todo y modificamos la propiedad completed a true
    newTodos[todoIndex] = {
      text: todos[todoIndex].text,
      completed: true,
    };
    // enviamos la nueva lista de todos para actualizar el estado, y se vuelve a renderizar al app
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

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
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
