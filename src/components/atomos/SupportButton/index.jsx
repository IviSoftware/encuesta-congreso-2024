import React from 'react';

function SupportButton() {
    // Números de teléfono para WhatsApp
    const phoneNumbers = [
        '+5219531075704', // Reemplaza con el primer número
        '+522214064130'  // Reemplaza con el segundo número
    ];

    // Función para abrir WhatsApp con un número aleatorio
    const handleSupportClick = () => {
        const randomNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
        window.open(`https://wa.me/${randomNumber}`, '_blank');
    };

    return (
        <button 
            onClick={handleSupportClick}
            className="fixed bottom-4 right-4 bg-white bg-opacity-30 backdrop-blur-lg text-black font-bold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out"
        >
            Soporte
        </button>
    );
}

export { SupportButton };