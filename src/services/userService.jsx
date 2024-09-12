import Swal from "sweetalert2";
import { formatSurveyResponse1,formatSurveyResponse2,formatSurveyResponse3,formatSurveyResponse4 } from "../utils";
const API = "https://api.encuestas.integrameetings.com/cnd2024/"

const validateUser = async (userEmail) => {
    // Muestra el modal de "Cargando" antes de hacer la petición
    Swal.fire({
        title: 'Validando...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const jsonBody = {
        "evento": "5",
        "action": "getUserByEmail",
        "email": userEmail
    };

    try {
        const response = await fetch('https://api.encuestas.integrameetings.com/cnd2024/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });

        if (!response.ok) {
            // Si hay un error en la respuesta, cierra el modal de cargando y muestra un error
            Swal.close(); // Cierra el modal de "Cargando"
            Swal.fire({
                title: "Ocurrió un error, contacte a soporte",
                icon: "error"
            });
            throw new Error('Failed to fetch user');
        }

        // Cierra el modal de "Cargando" al recibir la respuesta
        Swal.close(); 

        // Procesa la respuesta
        return await response.json();
    } catch (error) {
        // Manejo de errores
        Swal.close(); // Asegúrate de cerrar el modal en caso de error
        console.error('Error al validar usuario:', error);
        Swal.fire({
            title: "Ocurrió un error, contacte a soporte",
            icon: "error"
        });
        throw error;
    }
};


const sendData = async (data,slug)=>{
    
    console.log("sendData");

    const metadataUser = JSON.parse(localStorage.getItem('metadataUser'))

    let dataFormatted = '';

    switch (slug) {
        case "sat_con_per_pro_vir":
            dataFormatted = formatSurveyResponse1(data)
        break;

        case "sat_con_per_pro_pre":
            dataFormatted = formatSurveyResponse2(data)
        break;

        case "sat_con_per_gen_vir":
            dataFormatted = formatSurveyResponse3(data)
        break;

        case "sat_con_per_gen_pre":
            dataFormatted = formatSurveyResponse4(data)
        break;
    
        default:
            break;
    }
   
    const email = localStorage.getItem('emailAsistente');
    const asistantId = localStorage.getItem('idAsistenteDiabetes');

    const responses = [];
    responses.push(dataFormatted)



    const bodyConstructor = {
        "action": "saveSatisfactionSurveyResponses",
        "email": email,
        "asistenteId":asistantId,
        "slug": slug,
        "respuestas":responses,
        "fkAsistenteMetaData":metadataUser
    }

    console.log(bodyConstructor)

    const apiRes = await fetch(API,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(bodyConstructor)
    }); 

    const json = await apiRes.json();
    console.log('jsooon',json)
    return json
}


export {validateUser,sendData}