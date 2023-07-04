import React from "react";

import { AppUI } from "./AppUI";

/**
 * useLocalStora es un custom react hook donde abstraemos la logica del LocalStorage
 * La funcion useLocalStorage no solo retorna los todos items del localStorage sino tambien
 * el item o elemento que guardamos en el LocalStorage
 * param  itemName-> nombre del elemento o key con el que vamos a trabajar
 * param initialValue -> valor inicial item en el local storage
 */
function useLocalStorage(itemName, initialValue) {
  // llamamos al LocalStorage de acuerdo al itemName para obtener sus elementos
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  // validamos si no hay items
  if (!localStorageItem) {
    // si no hay, el estado inicial es un array vacio
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = [];
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  // dentro del custom hook, llamamos a React.useState()
  const [item, setItem] = React.useState(parsedItem);

  // guardamos las actualizaciones que se nos envien en localstorage, como el state en React
  const saveItem = (newTodos) => {
    // persistimos la info en el localStorage
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem(itemName, stringifiedTodos);
    // actualizamos el state de la app
    setItem(newTodos);
  };

  return [item, saveItem];
}

/**
 * 1. Tenemos un array de todos (defaultTodos)
 * 2. Contamos los todos marcados como completados (completedTodos)
 * 3. Contamos la cantidad de todos creados (totalTodos)
 * 4. Filtramos los todos dependiendo lo que escriban y lo colocamos en el array searchedTodos
 * 5. La funcion completeTodo cada vez que reciba un text va a buscar en la lista de todos cual
 *    de los todos coincide con el texto
 */
function App(props) {
  // llamamos a nuestro custom hook,para que los componentes se vuelvan a renderizar
  // pasamos el nombre del item en el localstorage y el valor inicial del todo app
  const [todos, saveItem] = useLocalStorage("TODOS_V1", []);

  // El componente App maneja el estado, el cual lo pasa a todos los componentes hijos
  // almacenamos el state en searchValue
  // setSearchValue es una funcion que actualiza el state de la app
  const [searchValue, setSearchValue] = React.useState("");

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
    saveItem(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveItem(newTodos);
  };

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
