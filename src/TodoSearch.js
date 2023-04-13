import React from "react";

import "./TodoSearch.css";

function TodoSearch() {
  // almacenamos el state en searchValue
  // setSearchValue es una funcion que actualiza el state de la app
  const [searchValue, setSearchValue] = React.useState("");

  // escuchamos los cambios hechos en el input search para llamar a la funcion setSearchValue y asi
  // actualizar el state searchValue
  const onHandleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return [
    /** input.value esta conectado con el state */
    <input
      className="TodoSearch"
      type="text"
      placeholder="Ingrese una nueva tarea"
      value={searchValue}
      onChange={onHandleChange}
    />,
    <p>{searchValue}</p>,
  ];
}

export { TodoSearch };
