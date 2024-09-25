import React from "react";
import Swal from "sweetalert2";

function SupportButton() {
  // Números de teléfono para WhatsApp
  const phoneNumbers = [
    "+522492623130", // Reemplaza con el primer número
    "+522214064130", // Reemplaza con el segundo número
  ];

  // Horario de soporte
  const supportStartTime = 9; // 09:00 am
  const supportEndTime = 17.67; // 5:40 pm (5 + 40/60)

  // Función para verificar si está en horario y día de soporte
  const isSupportAvailable = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const currentHour = now.getHours() + now.getMinutes() / 60; // Hora actual con minutos como decimales

    // Verificar si es lunes a viernes y está en el horario de soporte
    const isWeekday = currentDay >= 1 && currentDay <= 5; // 1 a 5 = lunes a viernes
    const isWithinSupportHours =
      currentHour >= supportStartTime && currentHour <= supportEndTime;

    return isWeekday && isWithinSupportHours;
  };

  // Función para manejar el click del botón de soporte
  const handleSupportClick = () => {
    if (isSupportAvailable()) {
      const randomNumber =
        phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
      window.open(`https://wa.me/${randomNumber}`, "_blank");
    } else {
      Swal.fire(
        "El soporte solo está disponible de lunes a viernes de 09:00 am a 05:40 pm."
      );
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
