import { json } from "react-router-dom";

function validateObjectFields(obj, keys, translations,setDataModule) {

   


    const missingFields = [];

    console.log(obj,'objssss')

    // Verificar si el objeto está vacío
    if (Object.keys(obj).length === 0) {
        return { validate: 3, fields: [] };
    }

    // Verificar si el campo "extraEdad" es menor a 18
    if (obj.extraEdad && Number(obj.extraEdad) < 18) {
        return { validate: 4, fields: ["extraEdad"] };
    }

    // Verificar si todas las claves especificadas tienen valores
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];

        try {
            if (!value || (typeof value === 'string' && value.trim() === "")) {
                // Añadir la traducción correspondiente al campo faltante
                missingFields.push(translations[i] || key);
            }
        } catch (error) {
            console.error(`Error con la clave: "${key}", valor:`, value);
            console.error(error);
        }
    }

    // Si hay campos faltantes
    if (missingFields.length > 0) {
        return { validate: 0, fields: missingFields };
    }

    // Si todos los campos están llenos
    return { validate: 1, fields: [] };
}


function formatSurveyResponse1(inputObject) {
    // Crear el objeto de salida con los valores fijos
    let responses = {};
   

    // Mapeo de las respuestas
    const responseKeys = [
        "extraEdad",
        "extraEstadoProcedencia",
        "extraPerfil",
        "extraEspecialidad",
        "extraConsulta",
        "extraInstitucionTrabajo",
        "extraMedioEnteroCongreso",
        "extraKitCongresistaAdecuado",
        "extraTransmisionPonenciasAdecuada",
        "extraMediosAudiovisualesAdecuados",
        "extraTemasActuales",
        "extraNivelContenidos",
        "extraDistribucionActividades",
        "extraTiempoActividades",
        "extraSeleccionPonentes",
        "extraParticipacionPonentes",
        "extraComunicacionPonentes",
        "extraCumplieronObjetivos",
        "extraOrganizacionCongreso",
        "extraCongresoCumplioExpectativas",
        "extraEscalaObjetivoAcademico",
        "extraRecomendariaCongreso",
        "extraAcudiria34Congreso",
        "extraObservacionesConclusiones"
    ];

    // Rellenar las respuestas con los valores del objeto de entrada
    responseKeys.forEach(key => {
        if (inputObject[key]) {
            responses[key] = inputObject[key];
        } else {
            console.log("Falta:", key);
        }
    });

    // Combinar extraPlenariasInteresantes1 y extraPlenariasInteresantes2 en un array y luego en un string
    const extraPlenariasInteresantes1 = inputObject.extraPlenariasInteresantes1 || '';
    const extraPlenariasInteresantes2 = inputObject.extraPlenariasInteresantes2 || '';
  


     // Crear el array filtrando valores vacíos
     const extraPlenariasInteresantesArray = [extraPlenariasInteresantes1, extraPlenariasInteresantes2].filter(item => item !== '');
     responses.extraPlenariasInteresantes = JSON.stringify(extraPlenariasInteresantesArray);

    

    // Devolver el objeto formateado
    return responses;
}


function formatSurveyResponse2(inputObject) {
    // Crear el objeto de salida con los valores fijos
    let responses = {};

    // Mapeo de las respuestas
    const responseKeys = [
        "extraEdad",
        "extraEstadoProcedencia",
        "extraPerfil",
        "extraEspecialidad",
        "extraConsulta",
        "extraInstitucionTrabajo",
        "extraMedioEnteroCongreso",
        "extraInstalacionSedeCongresoAdecuada",
        "extraDistribucionSalonesAdecuada",
        "extraZonaComercialInfoRelevanteObjetivoCongreso",
        "extraViajeSaludIdeaInnovadoraAcordeObjectivoCongreso",
        "extraNivelContenidos",
        "extraDistribucionActividades",
        "extraTiempoActividades",
        "extraSeleccionPonentes",
        "extraParticipacionPonentes",
        "extraComunicacionPonentes",
        "extraCumplieronObjetivos",
        "extraOrganizacionCongreso",
        "extraCongresoCumplioExpectativas",
        "extraEscalaObjetivoAcademico",
        "extraRecomendariaCongreso",
        "extraAcudiria34Congreso",
        "extraObservacionesConclusiones",
        "extraMediosAudiovisualesAdecuados",
        "extraTemasActuales"
    ];

    // Rellenar las respuestas con los valores del objeto de entrada
    responseKeys.forEach(key => {
        if (inputObject[key]) {
            responses[key] = inputObject[key];
        } else {
            console.log("Falta:", key);
        }
    });

    // Combinar extraPlenariasInteresantes1 y extraPlenariasInteresantes2 en un array y luego en un string
    const extraPlenariasInteresantes1 = inputObject.extraPlenariasInteresantes1 || '';
    const extraPlenariasInteresantes2 = inputObject.extraPlenariasInteresantes2 || '';


      // Crear el array filtrando valores vacíos
      const extraPlenariasInteresantesArray = [extraPlenariasInteresantes1, extraPlenariasInteresantes2].filter(item => item !== '');

      // Asignar el array directamente en la respuesta
      responses.extraPlenariasInteresantes = json.stringify(extraPlenariasInteresantesArray);

    

    // Devolver el objeto formateado
    return responses;
}


function formatSurveyResponse3(inputObject) {
    // Crear el objeto de salida con los valores fijos
    let responses = {};

    // Mapeo de las respuestas
    const responseKeys = [
        "extraEdad",
        "extraEstadoProcedencia",
        "extraVivesCon",
        "extraTelefono",
        "extraMedioEnteroCongreso",
        "extraKitCongresistaAdecuado",
        "extraTransmisionPonenciasAdecuada",
        "extraMediosAudiovisualesAdecuados",
        "extraTemasActuales",
        "extraNivelContenidos",
        "extraDistribucionActividades",
        "extraTiempoActividades",
        "extraSeleccionPonentes",
        "extraParticipacionPonentes",
        "extraComunicacionPonentes",
        "extraCumplieronObjetivos",
        "extraOrganizacionCongreso",
        "extraCongresoCumplioExpectativas",
        "extraEscalaObjetivoAcademico",
        "extraRecomendariaCongreso",
        "extraAcudiria34Congreso",
        "extraObservacionesConclusiones",
        "extraSugerencias"
    ];

    // Rellenar las respuestas con los valores del objeto de entrada
    responseKeys.forEach(key => {
        if (inputObject[key]) {
            responses[key] = inputObject[key];
        } else {
            console.log("Falta:", key);
        }
    });

    // Combinar extraPlenariasInteresantes1 y extraPlenariasInteresantes2 en un array y luego en un string
    const extraPlenariasInteresantes1 = inputObject.extraPlenariasInteresantes1 || '';
    const extraPlenariasInteresantes2 = inputObject.extraPlenariasInteresantes2 || '';

       // Crear el array filtrando valores vacíos
       const extraPlenariasInteresantesArray = [extraPlenariasInteresantes1, extraPlenariasInteresantes2].filter(item => item !== '');

       // Asignar el array directamente en la respuesta
       responses.extraConferenciasInteresantes = json.stringify(extraPlenariasInteresantesArray);
   

    // Devolver el objeto formateado
    return responses;
}




function formatSurveyResponse4(inputObject) {
    // Crear el objeto de salida con los valores fijos
    let responses = {};

    // Mapeo de las respuestas
    const responseKeys = [  
        "extraEdad",
        "extraEstadoProcedencia",
        "extraTipoDiabetes",
        "extraTelefono",
        "extraMedioEnteroCongreso",
        "extraKitCongresistaAdecuado",
        "extraTransmisionPonenciasAdecuada",
        "extraMediosAudiovisualesAdecuados",
        "extraInstalacionesAdecuadas",
        "extraDistribucionSalones",
        "extraMediosAudiovisualesVisibles",
        "extraStandsInformacionRelevante",
        "extraViajeSaludInnovador",
        "extraTemasActuales",
        "extraNivelContenidos",
        "extraDistribucionActividades",
        "extraTiempoActividades",
        "extraSeleccionPonentes",
        "extraParticipacionPonentes",
        "extraComunicacionPonentes",
        "extraCumplieronObjetivos",
        "extraOrganizacionCongreso",
        "extraCongresoCumplioExpectativas",
        "extraEscalaObjetivoAcademico",
        "extraRecomendariaCongreso",
        "extraAcudiria34Congreso",
        "extraObservacionesConclusiones",
        "extraSugerencias"
    ];

    // Rellenar las respuestas con los valores del objeto de entrada
    responseKeys.forEach(key => {
        if (inputObject[key]) {
            responses[key] = inputObject[key];
        } else {
            console.log("Falta:", key);
        }
    });


    // Combinar extraPlenariasInteresantes1 y extraPlenariasInteresantes2 en un array y luego en un string
    const extraPlenariasInteresantes1 = inputObject.extraConferenciaInteresantes1 || '';
    const extraPlenariasInteresantes2 = inputObject.extraConferenciaInteresantes2 || '';


    // Crear el array filtrando valores vacíos
    const extraPlenariasInteresantesArray = [extraPlenariasInteresantes1, extraPlenariasInteresantes2].filter(item => item !== '');

    // Asignar el array directamente en la respuesta
    responses.extraConferenciasInteresantes = json.stringify(extraPlenariasInteresantesArray);



    // Devolver el objeto formateado
    return responses;
}


const getBasicData = ()=>{
    const fullName = localStorage.getItem('nombreAsistente');
    const telefonoAsistente = localStorage.getItem('telefonoAsistente')
    const estadoProcedenciaAsistente = localStorage.getItem('estadoProcedenciaAsistente')

    return {
        fullName,
        telefonoAsistente,
        estadoProcedenciaAsistente
    }

}


export { validateObjectFields, formatSurveyResponse1, formatSurveyResponse2,formatSurveyResponse3,formatSurveyResponse4,getBasicData};
