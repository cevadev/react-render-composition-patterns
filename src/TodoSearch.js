import React from "react";

import "./TodoSearch.css";

function TodoSearch() {
  // escuchamos los cambios hechos en el input search
  const onHandleChange = (event) => {
    // print input text value
    console.info(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      type="text"
      placeholder="Cebolla"
      onChange={onHandleChange}
    />
  );
}

export { TodoSearch };
