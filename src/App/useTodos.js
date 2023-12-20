import React from "react";

import { useLocalStorage } from "./useLocalStorage";

/*
 * React.createComtext() retorna un objeto con dos propiedades
 * TodoContext.Provider: Nos permite envolver toda la aplicacion en el componente App.js
 * TodoContext.Consumer: Este componete se utiliza en todo lugar que se necesite informacion
 *                       del estado compartido en cualquiera de los componentes
 */

// Convertimos el provider en un custom hook
function useTodos() {
  /*
   * Provider envuelve a toda la app, es decir, va a contener a todos los componentes de la app
   * props.children: cualquier componente que llame a todoProvider
   * value : todas las propiedade o estados que queremos compartir para que este disponibles en el
   *         contexto se deben indicar en la propiedad value
   */

  // llamamos a nuestro custom hook,para que los componentes se vuelvan a renderizar
  // pasamos el nombre del item en el localstorage y el valor inicial del todo app
  // recibimos los states del custom hook
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  /**
   * 1. Tenemos un array de todos (defaultTodos)
   * 2. Contamos los todos marcados como completados (completedTodos)
   * 3. Contamos la cantidad de todos creados (totalTodos)
   * 4. Filtramos los todos dependiendo lo que escriban y lo colocamos en el array searchedTodos
   * 5. La funcion completeTodo cada vez que reciba un text va a buscar en la lista de todos cual
   *    de los todos coincide con el texto
   */

  // El componente App maneja el estado, el cual lo pasa a todos los componentes hijos
  // almacenamos el state en searchValue
  // setSearchValue es una funcion que actualiza el state de la app
  const [searchValue, setSearchValue] = React.useState("");

  // estamos para el Modal
  const [openModal, setOpenModal] = React.useState(false);

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

  // 1. funcion que completa un todo
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
    saveTodos(newTodos);
  };

  // 2. funcion que agrega un todo
  const addTodo = (text) => {
    // clonamos la lista de todos
    const newTodos = [...todos];
    // creamos un nuevo objeto TODO y lo agregamos a nuestro array de TODO's
    newTodos.push({
      text,
      completed: false,
    });

    // enviamos la nueva lista de todos para actualizar el estado, y se vuelve a renderizar al app
    saveTodos(newTodos);
  };

  // 3.
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  /**
   * Los efectos en react son un hook en react que nos permiten cierta parte del codigo de un componente
   * no se ejecute cada vez que hace render la app sino dependiendo de ciertas condiciones.
   * Nuestra app va a simular un llamado a una api para traer los to-do's por lo que necesitamos
   * tres estados de carga:
   * 1.Estamos cargando la info
   * 2.Hubo un error miestras cargamos la info
   * 3.La operacion de carga se hizo exitosamente
   *
   * React.useEffect -> este hook ejecuta la funcion que se le pase no exactamente despues de renderizar
   * el componente sino justo antes cuando react ya tiene todo preparado internamente para renderizar
   *
   */
  //  console.info("Render antes de llamar a React.useEffect");
  //  React.useEffect(() => {
  //    console.info("Llamando a React.useEffect");
  // dentro del array podemos indicar cuando se debe esjecutar el useEffect
  // cuando colocamos un array vacio [] aunque el useEffect este en el codigo este se ejecuta
  // una sola vez. La primera vez que se renderiza el componente sin importar cuantas
  // veces vuelva a renderizarse el componente

  // tambien podemos querer que el useEffect solo se ejecute cuando se produce un cambio en
  // en el estado del componente. Por ejemplo vamos a escuchar los cambios en la variable
  // totalTodos y cuando se produzca un cambio, se ejecutara el useEffect
  //  }, [totalTodos]);
  //  console.info("Luego de llamar a React.useEffect");

  /**
   * la funciones del provider las almacenamos en su propiedad value para que al envolver nuestra app en el TodoProvider
   * cualquier componente de la app que necesita informacion del contexto podamos utilizar un componente consumer o el
   * hook de react llamado useContext para acceder a dichas funciones.
   */
  return {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    addTodo,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    sincronizeTodos,
  };
}

// exportamos el custom Hook
export { useTodos };
