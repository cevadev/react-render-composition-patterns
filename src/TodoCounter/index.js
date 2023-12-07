import React from "react";

import "./TodoCounter.css";

function TodoCounter({ totalTodos, completedTodos, loading }) {
  return (
    <h1 className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>
      Has completado {completedTodos} todos de {totalTodos}
    </h1>
  );
}

export { TodoCounter };
