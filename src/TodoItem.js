import React from "react";

import "./TodoItem.css";
function TodoItem(props) {
  const onComplete = () => {
    alert(`Ya completaste la tarea ${props.text}`);
  };

  const onDelete = () => {
    alert(`Borraste la tarea ${props.text}`);
  };

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${
          props.completed && "Icon-checked--active"
        }`}
        onClick={onComplete}
      >
        🗸
      </span>
      {/*si el componente recibe la propiedad complete y es true entonces agregamos la clase TodoItem-p--complete */}
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <span className="Icon Icon-delete" onClick={onDelete}>
        ⛌
      </span>
    </li>
  );
}

export { TodoItem };
