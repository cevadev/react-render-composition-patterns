import React from "react";

import "./TodoCounter.css";

function TodoCounter(props) {
  const { total, completed } = props;

  return (
    <h1 className="TodoTitle">
      Has completado {completed} todos de {total}
    </h1>
  );
}

export { TodoCounter };
