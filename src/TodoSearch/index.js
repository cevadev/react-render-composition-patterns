import React from "react";

import { TodoContext } from "../TodoContext";
import "./TodoSearch.css";

function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);

  // escuchamos los cambios hechos en el input search para llamar a la funcion setSearchValue y asi
  // actualizar el state searchValue
  const onHandleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    /** input.value esta conectado con el state */
    <input
      className="TodoSearch"
      type="text"
      placeholder="Ingrese una nueva tarea"
      value={searchValue}
      onChange={onHandleChange}
    />
  );
}

export { TodoSearch };
