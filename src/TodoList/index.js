import React from "react";

import "./TodoList.css";
function TodoList(props) {
  return (
    <section className="TodoList-container">
      <ul>
        {/*rederizamos las propiedades que provienen de las render props */}
        {props.error && props.onError()}
        {props.loading && props.onLoading()}
        {/**validamos si el props.loading no esta cargando y ademas no tenemos searchedTodos entonces mostramos props.onEmptyTodos */}
        {!props.loading && !props.searchedTodos.length && props.onEmptyTodos()}
        {/** si las validaciones no funcionaron, entonces llamamos */}
        {props.searchedTodos.map((todo) => props.render(todo))}
      </ul>
    </section>
  );
}

export { TodoList };
