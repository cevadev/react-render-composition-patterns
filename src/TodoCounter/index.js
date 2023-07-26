import React from "react";

import { TodoContext } from "../TodoContext";
import "./TodoCounter.css";

function TodoCounter() {
  const { totalTodos, completedTodos } = React.useContext(TodoContext);

  return (
    <h1 className="TodoTitle">
      Has completado {completedTodos} todos de {totalTodos}
    </h1>
  );
}

export { TodoCounter };
