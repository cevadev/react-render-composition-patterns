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
  // creamos loading y error state
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  // dentro del custom hook, llamamos a React.useState() y el state inicial sera vacio
  const [item, setItem] = React.useState(initialValue);

  // no brindamos la informacion directamente del localstorage sino que simulamos que se
  // tarda un poco de tiempo, dicho codigo lo envolvemos dentro del hook useEffect
  // despues de 2 segundo, se recupera la informacion en el localstorage
  React.useEffect(() => {
    setTimeout(() => {
      try {
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
        // actualizamos el estado con la informacion del localstorage
        setItem(parsedItem);

        // cuando ya tenemos informacion en el state item, actualizamos el state loading a false
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 2000);
  });

  // guardamos las actualizaciones que se nos envien en localstorage, como el state en React
  const saveItem = (newTodos) => {
    try {
      // persistimos la info en el localStorage
      const stringifiedTodos = JSON.stringify(newTodos);
      localStorage.setItem(itemName, stringifiedTodos);
      // actualizamos el state de la app
      setItem(newTodos);
    } catch (error) {
      setError(error);
    }
  };

  // enviamos los states a los componentes que se suscriben al custom hook useLocalStorage
  // cuando el custom hook retornar mas de 2 elementos se recomienda que retorne un objeto y no un array
  return { item, saveItem, loading, error };
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
  // recibimos los states del custom hook
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

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
    saveTodos(newTodos);
  };

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

  return (
    <AppUI
      loading={loading}
      error={error}
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
