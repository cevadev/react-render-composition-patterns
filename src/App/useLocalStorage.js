import React from "react";

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

export { useLocalStorage };
