import React, { Children } from "react";

// Por medio de React.cloneElement pasamos la propiedad loading a los hijos del componente TodoHeader
function TodoHeader({ children, loading }) {
  return (
    <header>
      {/**retornamos un clone de la propiedad children con la propiedad loading modificada */
      /** manejamos los childrens que viene de TodoHeader */}
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
}

export { TodoHeader };
