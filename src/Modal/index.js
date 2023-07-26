import ReactDOM from "react-dom";

import "./Modal.css";

/*
 * Funcion que permite mostrar un modal con el contenido que deseemos enviar pudiendo ser
 * un componente, un mensaje de error etc
 */
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("modal")
  );
}

export { Modal };
