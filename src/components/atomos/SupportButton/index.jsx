import React from "react";
import Swal from "sweetalert2";

function SupportButton() {
  // Números de teléfono para WhatsApp
  const phoneNumbers = [
    "+522211135027", // Reemplaza con el primer número
    "+522214064130", // Reemplaza con el segundo número
  ];

  // Horario de soporte
  const supportStartTime = 9; // 09:00 am
  const supportEndTime = 17.67; // 5:40 pm (5 + 40/60)

  // Función para verificar si está en horario de soporte
  const isSupportAvailable = () => {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60; // Hora actual con minutos como decimales
    return currentHour >= supportStartTime && currentHour <= supportEndTime;
  };

  // Función para manejar el click del botón de soporte
  const handleSupportClick = () => {
    if (isSupportAvailable()) {
      const randomNumber =
        phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
      window.open(`https://wa.me/${randomNumber}`, "_blank");
    } else {
      Swal.fire("El soporte solo está disponible de 09:00 am a 05:40 pm.");
    }
  };

  return (
    <button
      onClick={handleSupportClick}
      className="fixed bottom-4 right-4 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out"
      style={{ zIndex: 1000, background: "#05EA78" }} // Z-index alto para que se muestre encima de todo
    >
      Soporte
    </button>
  );
}

export { SupportButton };
