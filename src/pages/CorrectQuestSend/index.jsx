import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CorrectQuestSend.css';

function CorrectQuestSend() {
    const [inProp, setInProp] = useState(true);

    const handleReload = () => {
        window.location.reload(); // Recarga la página
    };

    const handleConstancia = () => {
        // Aquí puedes agregar la lógica para lo que debería hacer el botón de "Constancia"
        const emailUser = localStorage.getItem('emailAsistente');
        window.open('https://forms.gle/TY7S3z3hXqkrrj227', '_blank');
        // El segundo argumento '_blank' hace que el enlace se abra en una nueva pestaña
    };


    const handleDownloadConstancia = () => {
        // Aquí puedes agregar la lógica para lo que debería hacer el botón de "Constancia"
        const emailUser = localStorage.getItem('emailAsistente');
        window.open(`https://constancias.integrameetings.com/cnd/2024/congreso/sesion.php?correo=${emailUser}`, '_blank');
        // El segundo argumento '_blank' hace que el enlace se abra en una nueva pestaña
    };

    const slugQuest = localStorage.getItem('slugQuest')
    

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <CSSTransition
                in={inProp}
                timeout={500}
                classNames="scale-fade"
                appear
            >
                <img
                    alt="Ilustración de éxito"
                    src="/img/illustrationsQuestReady.png"
                    className="illustration"
                />
            </CSSTransition>
            <CSSTransition
                in={inProp}
                timeout={700}
                classNames="fade-up"
                appear
            >
                <p className="mt-6 text-center text-content">
                    <b>¡Perfecto! Hemos recibido tus respuestas, gracias por tomarte el tiempo de contestar.</b>
                </p>
            </CSSTransition>
            <div className="mt-8 flex flex-col justify-center items-center gap-6 space-x-4">
              
              {(slugQuest === 'sat_con_per_gen_vir' || slugQuest === 'sat_con_per_gen_pre') &&  <div className="flex flex-col items-center gap-6">
              <button 
                    className="px-4 py-2 bg-gray-100 text-black rounded shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={handleDownloadConstancia}
                >
                    Descargar constancia
                </button>
                 
              </div> }


             {(slugQuest === 'sat_con_per_pro_vir' || slugQuest === 'sat_con_per_pro_pre') &&  <div className="flex flex-col items-center gap-6">
                 <p className="text-center">PASOS PARA DESCARGAR TU CONSTANCIA:</p>
                 <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '0' }}>
                    <li>CONTESTA LA SIGUIENTE ENCUESTA</li>
                    <li>VUELVE A INGRESAR TU CORREO EN <a href="https://cnd-encuesta.vercel.app/"><b className='text-blue-500'>ESTE LINK</b></a></li>
                    <li>SE ABRIRÁ UN MODAL DONDE DEBES DAR CLIC EN EL BOTÓN PARA DESCARGAR CONSTANCIA</li>
                 </ol>
                <button 
                    className="px-4 py-2 bg-gray-100 text-black rounded shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={handleConstancia}
                >
                    Siguiente encuesta
                </button>
              </div>
              }

              <button 
                    className="px-4 mt-4 py-2 bg-gray-100 text-black rounded shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={handleReload}
                >
                    Cerrar
                </button> 
            </div>
        </div>
    );
}

export { CorrectQuestSend };
