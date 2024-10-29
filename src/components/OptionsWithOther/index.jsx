import { useState } from "react";
import { OptionsCautivaForms } from "../OptionsCautivaForms";
import { InputCautivaForms } from "../InputCautivaForms";

function OptionsWithOther({ text, options, name, setDataModule, dataModule }) {
  const [showOther, setShowOther] = useState(false);

  const handleOptionChange = (value) => {
    if (value === "Otro" || value === "Otras") {
      setShowOther(true);
      setDataModule({ ...dataModule, [name]: "" }); // Limpia el valor principal para usar el campo de texto
    } else {
      setShowOther(false);
      setDataModule({ ...dataModule, [name]: value }); // Asigna el valor directamente si no es "Otro"
    }
  };

  const handleOtherInputChange = (e) => {
    const { value } = e.target;
    setDataModule({ ...dataModule, [name]: value });
  };

  return (
    <div>
      <OptionsCautivaForms
        text={text}
        options={options}
        name={name}
        dataModule={dataModule}
        setDataModule={(updatedData) => handleOptionChange(updatedData[name])}
      />
      {showOther && (
        <div style={{ marginTop: "30px" }}>
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            name={name} // Asigna el `name` principal al campo de texto
            text="Especifica"
            onChange={handleOtherInputChange} // Asigna el valor del input de texto al `dataModule`
          />
        </div>
      )}
    </div>
  );
}

export { OptionsWithOther };
