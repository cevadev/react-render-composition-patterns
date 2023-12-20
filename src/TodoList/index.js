import React from "react";

import "./TodoList.css";
function TodoList(props) {
  const renderFunc = props.children || props.render;
  return (
    <section className="TodoList-container">
      <ul>
        {/*rederizamos las propiedades que provienen de las render props */}
        {props.error && props.onError()}
        {/** cuando props.loading es true mostramos lo que hay en onLoading */}
        {props.loading && props.onLoading()}

        {!props.loading && !props.totalTodos && props.onEmptyTodos()}

        {/**validamos si el props.loading no esta cargando y ademas no tenemos searchedTodos entonces mostramos props.onEmptyTodos */}
        {!!props.totalTodos &&
          !props.searchedTodos.length &&
          props.onEmptySearchResults(props.searchText)}

        {/** validamos q no existan errores, validamos que no estemos cargando, si todo ok, mostramos la render function o render prop */}
        {!props.loading && !props.error && props.searchedTodos.map(renderFunc)}
      </ul>
    </section>
  );
}

export { TodoList };
