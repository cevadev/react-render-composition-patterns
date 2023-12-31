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
import { TodosError } from "../TodosError/index.js";
import { TodosLoading } from "../TodosLoading/index.js";
import { EmptyTodos } from "../EmptyTodos/index.js";
import { ChangeAlert } from "../ChangeAlert/index.js";

function App() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
    sincronizeTodos,
  } = useTodos();
  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        {/** Todos los componentes dentro de TodoHeader reciben automaticamente la propiedad loading */}
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>
      {/** enviamos las render props. recibimos el value que es una funcion expuesto en el context.provider
       * NOTA: Debemos notar que TodoList no es quien decide cual sera su contenido sino que es el componente AppUI
       *       el que decide lo que TodoList va a tener por dentro
       */}
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        render={(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      />

      {/**doble negacion: que no exista, que no sea true (doblemente false es igual a true)*/}
      {!!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}></TodoForm>
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
      {/** exportamos el componente que tiene el High order componente de  withStoragelistener
       * ChangeAlertWithStorageListener posee la propiedad sincronize con la que podemos mandar a sincronizar los TODOS con el
       * localStorage
       */}
      <ChangeAlert sincronize={sincronizeTodos} />
    </React.Fragment>
  );
}

export default App;
