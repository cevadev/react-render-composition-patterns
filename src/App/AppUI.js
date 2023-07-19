import React from "react";

import { TodoCounter } from "../TodoCounter/index.js";
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { TodoContext } from "../TodoContext/index.js";
import { CreateTodoButton } from "../CreateTodoButton/index.js";

// recibimos las props
function AppUI() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      {/** */}
      <TodoContext.Consumer>
        {/** enviamos las render props. recibimos el value expuesto en el context.provider */}
        {(value) => {
          return (
            <TodoList>
              {value.error && (
                <p>se ha producido un error inesperado en la carga de to-dos</p>
              )}
              {value.loading && (
                <p>Estamos cargando la informacion de to-dos</p>
              )}
              {!value.loading && !value.searchedTodos.lenght && (
                <p>puede crear tu primer to-do</p>
              )}
              {value.searchedTodos.map((todo) => (
                <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => value.completeTodo(todo.text)}
                  onDelete={() => value.deleteTodo(todo.text)}
                />
              ))}
            </TodoList>
          );
        }}
      </TodoContext.Consumer>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export { AppUI };
