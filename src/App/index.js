import React from "react";

import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";

function App() {
  // Envolvemos toda la app dentro de TodoProvider
  // cualquier componente dentro de AppUI podra llamar a TodoConsumer para consumir el estado ya guardado
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;
