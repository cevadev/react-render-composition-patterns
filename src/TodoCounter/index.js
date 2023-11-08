import React from "react";

import "./TodoCounter.css";

function TodoCounter({ totalTodos, completedTodos }) {
  return (
    <h1 className="TodoTitle">
      Has completado {completedTodos} todos de {totalTodos}
    </h1>
  );
}

export { TodoCounter };
