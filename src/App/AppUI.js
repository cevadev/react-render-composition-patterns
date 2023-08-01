import React from "react";

import { TodoCounter } from "../TodoCounter/index.js";
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { TodoContext } from "../TodoContext/index.js";
import { CreateTodoButton } from "../CreateTodoButton/index.js";
import { Modal } from "../Modal/index.js";
import { TodoForm } from "../TodoForm/index.js";

import "./App.css";

// recibimos las props
function AppUI() {
  // usando React.useContext que le pasamos el contexto de la app y obtenemos
  // las propiedades que guardamos en el provider
  const {
    error,
    loading,
    searchedTodos,
    completedTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      {/** enviamos las render props. recibimos el value que es una funcion expuesto en el context.provider */}
      <TodoList>
        {error && (
          <p>se ha producido un error inesperado en la carga de to-dos</p>
        )}
        {loading && (
          <p className="TodoMsg">Estamos cargando la informacion de to-dos</p>
        )}
        {!loading && !searchedTodos.lenght && (
          <p className="TodoMsg">puedes crear tu primer to-do</p>
        )}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completedTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      {/**doble negacion: que no exista, que no sea true (doblemente false es igual a true)*/}
      {!!openModal && (
        <Modal>
          <TodoForm></TodoForm>
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
