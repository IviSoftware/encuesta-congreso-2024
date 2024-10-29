import "./InputCautivaForms.css";
import { useState, useEffect, useRef } from "react";
import { ContainerElementForm } from "../ContainerElementForm";

function InputCautivaForms({
  text,
  name,
  type,
  max,
  setDataModule,
  dataModule,
  valueUser,
}) {
  const [limit, setLimit] = useState(valueUser || "");
  const hasInitialized = useRef(false); // Usamos useRef para almacenar un valor mutable que no dispara renders

  const sendToStageApi = (value) => {
    // Asegurarse de que se mantiene el estado existente y se actualiza solo el campo correspondiente
    const updatedData = { ...dataModule, [name]: value };

    // Actualizar el estado con el nuevo objeto
    setDataModule(updatedData);
  };

  useEffect(() => {
    // Solo ejecutar si no ha sido inicializado aún
    if (valueUser && !hasInitialized.current) {
      sendToStageApi(valueUser);
      hasInitialized.current = true; // Marcar como inicializado
    }
  }, [valueUser]); // Mantener la dependencia de valueUser

  const handleInputChange = (e) => {
    if (valueUser) return; // No permitir cambios si valueUser está presente

    let value = e.target.value;

    // Eliminar cualquier coma del valor ingresado
    value = value.replace(/,/g, "");

    if (type === "number") {
      // Eliminar cualquier caracter que no sea numérico
      value = value.replace(/[^0-9]/g, "");
    }

    if (max) {
      // Limitar la entrada si es necesario
      if (value.length <= Number(max) && Number(value) <= 120) {
        setLimit(value);
        sendToStageApi(value);
      }
    } else {
      setLimit(value);
      sendToStageApi(value);
    }
  };

  return (
    <ContainerElementForm>
      {text && <label className="TextTitleFormComponent">{text}</label>}

      <input
        name={name}
        type="text" // Cambiamos a text para evitar la "e" y otras letras
        value={limit}
        disabled={!!valueUser} // Deshabilitar el campo si valueUser está presente
        onChange={handleInputChange}
        inputMode={type === "number" ? "numeric" : "text"} // Asegurar que el teclado numérico aparezca en móviles
      />
    </ContainerElementForm>
  );
}

export { InputCautivaForms };
