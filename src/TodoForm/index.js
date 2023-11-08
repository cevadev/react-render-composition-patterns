import React from "react";

import "./TodoForm.css";

function TodoForm({ addTodo, setOpenModal }) {
  // dentro del componente TodoForm manejamos un estado local que escucha el TextArea
  const [newTodoValue, setNewTodoValue] = React.useState("");

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  /*
   * event -> evento de presionar teclas al momento de escribir
   */
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label for="todo">Agrega un nuevo To-do a la lista</label>
      <textarea
        name="todo"
        cols="30"
        rows="10"
        placeholder="Pagar el internet"
        value={newTodoValue}
        onChange={onChange}
      ></textarea>
      <div className="TodoForm-buttonContainer">
        <button className="TodoForm-button TodoForm-button-add" type="submit">
          Agregar
        </button>
        <button
          className="TodoForm-button TodoForm-button-cancel"
          onClick={onCancel}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
