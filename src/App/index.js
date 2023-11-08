import React from "react";

import { useTodos } from "./useTodos.js";
import { TodoCounter } from "../TodoCounter/index.js";
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { CreateTodoButton } from "../CreateTodoButton/index.js";
import { Modal } from "../Modal/index.js";
import { TodoForm } from "../TodoForm/index.js";
import { TodoHeader } from "../TodoHeader/index.js";

function App() {
  const {
    error,
    loading,
    searchedTodos,
    completedTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
  } = useTodos();
  return (
    <React.Fragment>
      <TodoHeader>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>
      {/** enviamos las render props. recibimos el value que es una funcion expuesto en el context.provider
       * NOTA: Debemos notar que TodoList no es quien decide cual sera su contenido sino que es el componente AppUI
       *       el que decide lo que TodoList va a tener por dentro
       */}
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
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}></TodoForm>
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export default App;
