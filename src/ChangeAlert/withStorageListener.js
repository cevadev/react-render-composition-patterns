import React from "react";

// High order Component
function withStorageListener(WrappedComponent) {
  // retornamos nuestro componente de verdad
  return function WrappedComponentWithStorageListener(props) {
    // creamos un react hook. establecemos la propiedad con la que vamos a notificar si hubo cambios en otra pestana o ventana
    // por defecto vamos a pensar que no hubo cambios en otra pestana o ventana del navegador.
    const [storageChange, setStorageChange] = React.useState(false);

    // el WrappedComponent se mostrara unicamente cuando la propiedad storageChange sea true, es decir, cuando haya un cambio
    return (
      // enviamos las propiedades (estado) al WrappedComponent
      <WrappedComponent show={storageChange} toggleShow={setStorageChange} />
    );
  };
}

export { withStorageListener };
