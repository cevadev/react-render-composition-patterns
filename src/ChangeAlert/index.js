import React from "react";

import "./ChangeAlert.css";
import { withStorageListener } from "./withStorageListener";

// ChangeAlert es el WrappedComponent
// recibimos las propiedades show y toggleShow que son inyectadas desde el high order component
function ChangeAlert({ show, toggleShow }) {
  if (show) {
    return <p>Hubo cambios</p>;
  }
}

// no solo exportamos el ChangeAlert sino lo exportamos with...
const ChageAlertWithStorageListener = withStorageListener(ChangeAlert); // llamamos al High order component

// exportamos el componente
export { ChageAlertWithStorageListener };
