import Swal from "sweetalert2";
import { formatSurveyResponseGen } from "../utils";
const API = "https://api.encuestas.integrameetings.com/iminCongreso2024/";

const validateUser = async (userEmail) => {
  // Muestra el modal de "Cargando" antes de hacer la petición
  Swal.fire({
    title: "Validando...",
    text: "Por favor espere",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const jsonBody = {
    evento: "no importa",
    action: "getUserByEmail",
    email: userEmail,
  };

  try {
    const response = await fetch(
      "https://api.encuestas.integrameetings.com/iminCongreso2024/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      }
    );

    if (!response.ok) {
      // Si hay un error en la respuesta, cierra el modal de cargando y muestra un error
      Swal.close(); // Cierra el modal de "Cargando"
      Swal.fire({
        title: "Ocurrió un error, contacte a soporte",
        icon: "error",
      });
      throw new Error("Failed to fetch user");
    }

    // Cierra el modal de "Cargando" al recibir la respuesta
    Swal.close();

    // Procesa la respuesta
    return await response.json();
  } catch (error) {
    // Manejo de errores
    Swal.close(); // Asegúrate de cerrar el modal en caso de error
    console.error("Error al validar usuario:", error);
    Swal.fire({
      title: "Ocurrió un error, contacte a soporte",
      icon: "error",
    });
    throw error;
  }
};

const sendData = async (data, slug) => {
  // Obtener los datos adicionales desde localStorage
  const email = localStorage.getItem("emailAsistente");
  const asistantId = localStorage.getItem("idAsistenteDiabetes");

  // Mapeo de los datos recibidos a los campos requeridos
  const formattedData = {
    extraAsistidoEventosPrevios: data.attendedEvent,
    extraLugarResidencia: data.residenceLocation,
    extraNacionalidad: data.nationality,
    extraPosicionHospital: data.hospitalPosition,
    extraAgradadoCongreso: data.likedCongress,
    extraCongresoCumplioExpectativas: data.metExpectations,
    extraUtilidadInformacion: data.usefulness,
    extraMejoroHabilidades: data.improvedSkills,
    extraSatisfaccionGeneral: data.satisfactionLevel,
    extraCalificacionInstalaciones: data.venueRating,
    extraCalificacionOrganizacion: data.eventOrganization,
    extraPlaticasFavoritas: data.favoriteTalks,
    extraQueNoTeGusto: data.dislikedEvent,
    extraAsistiriaFuturoEvento: data.futureAttendance,
    extraComentariosSugerencias: data.comments,
  };

  // Detección del dispositivo
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Windows/i.test(ua)) return "Windows";
    if (/Mac/i.test(ua)) return "MacOS";
    return "Unknown";
  };

  // Detección del navegador
  const getBrowserName = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    return "Unknown";
  };

  // Obtener la IP pública
  const getIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error al obtener IP:", error);
      return "Unknown IP";
    }
  };

  const location = localStorage.getItem("location");

  const oldMetaData = JSON.parse(localStorage.getItem("metadataUser"));

  // Construir la metadata
  const metadataUser = {
    ciudad: data.residenceLocation,
    dispositivo: getDeviceType(),
    estado: data.residenceLocation,
    pais: data.nationality,
    navegador: getBrowserName(),
    ip: await getIp(),
    ubicacion: location,
    nombre_completo: oldMetaData.nombreCompleto,
  };

  // Construir el cuerpo de la solicitud con los datos en el formato requerido
  const bodyConstructor = {
    action: "saveSatisfactionSurveyResponses",
    email: email,
    asistenteId: asistantId,
    slug: slug,
    respuestas: [formattedData],
    fkAsistenteMetaData: metadataUser,
  };

  console.log(bodyConstructor, "bodyConstructor");

  // Realizar la solicitud a la API (descomentar para producción)
  const apiRes = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyConstructor),
  });

  const json = await apiRes.json();
  return json;
};

export { validateUser, sendData };
