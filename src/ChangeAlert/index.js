import React from "react";

import "./ChangeAlert.css";
import { useStorageListener } from "./useStorageListener";
//import { withStorageListener } from "./withStorageListener";

// ChangeAlert es el WrappedComponent
// recibimos las propiedades show y toggleShow que son inyectadas desde el high order component
function ChangeAlert({ sincronize }) {
  // recibimos las dos propiedades del customHook
  const { show, toggleShow } = useStorageListener(sincronize);
  if (show) {
    return (
      <div className="ChangeAlert-bg">
        <div className="ChangeAlert-container">
          <p>
            Parece que cambiaste tus TODOs en otra pestaña o ventana del
            navegador.
          </p>
          <p>¿Quieres sincronizar tus TODOs?</p>
          <button
            className="TodoForm-button TodoForm-button--add"
            onClick={toggleShow}
          >
            Yes!
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// no solo exportamos el ChangeAlert sino lo exportamos with...
//const ChageAlertWithStorageListener = withStorageListener(ChangeAlert); // llamamos al High order component

// exportamos el componente
export { ChangeAlert };
