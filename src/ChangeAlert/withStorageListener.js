import React from "react";

// High order Component
function withStorageListener(WrappedComponent) {
  // retornamos nuestro componente de verdad y le pasamos las props para el WrappedComponent
  return function WrappedComponentWithStorageListener(props) {
    // creamos un react hook. establecemos la propiedad con la que vamos a notificar si hubo cambios en otra pestana o ventana
    // por defecto vamos a pensar que no hubo cambios en otra pestana o ventana del navegador.
    const [storageChange, setStorageChange] = React.useState(false);

    // agregamos el Event Listener para que escuche el evento storage
    window.addEventListener("storage", (change) => {
      // validamos si se produjo cambio en el key TDODS_V1 key del localStorage
      if (change.key === "TODOS_V1") {
        console.log("Se produjeron cambios en TODOS_V1");
        // actualizamos el state storageChange
        setStorageChange(true); // informamos al WrappedComponent que show es true y eso hace que se muestre el aviso
      }
    });

    // toggleShow mostrara dependiendo del estado de la app la alerta de sincronizacion
    const toggleShow = () => {
      props.sincronize();
      setStorageChange(false);
    };

    // el WrappedComponent se mostrara unicamente cuando la propiedad storageChange sea true, es decir, cuando haya un cambio
    return (
      // enviamos las propiedades (estado) al WrappedComponent
      <WrappedComponent show={storageChange} toggleShow={toggleShow} />
    );
  };
}

export { withStorageListener };
