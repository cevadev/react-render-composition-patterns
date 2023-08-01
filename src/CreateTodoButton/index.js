import React from "react";

import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = () => {
    // enviamos el estado anterior pero negandolo, es decir si es true, pasa a false o viceversa
    // logramos que si el modal es false, se muestre, y si se muestra pasa a false para q se oculte
    props.setOpenModal((oldState) => {
      return !oldState;
    });
  };

  return (
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };
