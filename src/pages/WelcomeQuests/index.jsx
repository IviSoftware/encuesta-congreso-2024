import { useState } from "react";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { InputWithOutText } from "../../components/atomos/InputWithoutText";
import { RiSurveyFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Navbar } from "../../components/Navbar";
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { validateUser } from "../../services/userService";
import { json } from "react-router-dom";
import { CorrectQuestSend } from "../CorrectQuestSend";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function WelcomeQuests({ setQuestState, setQuestType }) {
  const [email, setEmail] = useState("");

  return (
    <div>
      <Navbar />

      <div
        className="flex items-center justify-center"
        style={{ maxWidth: "550px", margin: "0 auto" }}
      >
        <div className="text-center p-6">
          <h1 className="text-3xl font-bold mt-12 mb-8 apple-text-animation">
            Te damos la bienvenida a la Encuesta de Satisfacción del LXXI
            Congreso Internacional en Nefrología IMIN 2024
          </h1>
          <p className="text-lg mb-8 apple-subtitle-animation">
            ¡Nos encantaría conocer tu experiencia!
          </p>
          <InputWithOutText
            text="Introduzca su correo"
            name="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <CautivaBtnForm
            onClick={async () => {
              if (email === "") {
                Swal.fire("¡Por favor, introduzca un correo!");
              } else {
                // Expresión regular para validar el formato del email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                  Swal.fire({
                    icon: "error",
                    title: "Correo inválido",
                    text: "Por favor, introduzca un correo válido.",
                  });
                } else {
                  localStorage.setItem("emailQuests", email);

                  const response = await validateUser(email);

                  if (
                    response.msg ===
                    "No se encontraron datos para el correo proporcionado"
                  ) {
                    Swal.fire({
                      title:
                        "Parece que aún no estás registrado. Para poder hacer la encuesta, primero necesitas registrarte. ",
                      text: "Si no es el caso, estamos en soporte para asistirte.",
                      icon: "info",
                    });
                  } else if (
                    response.msg === "Información obtenida exitosamente"
                  ) {
                    //guardamos el meta data

                    localStorage.setItem(
                      "metadataUser",
                      JSON.stringify(response.data.metadaData)
                    );

                    //Validariamos si ya contesto la encuesta

                    if (response.data.slugEncuestaContestada) {
                      Swal.fire({
                        title: `<div style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap;">
                        ¡Parece que ya has enviado tus respuestas! 
                          <picture>
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif" alt="😀" width="62" height="62">
                          </picture>
                        </div>`,
                        icon: false,
                        html: `Puedes acceder a tu constancia <a href="https://constancias.integrameetings.com/imin_general/2024/congreso/sesion.php?correo=${encodeURIComponent(
                          email
                        )}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">aquí</a>.`,
                        confirmButtonText: "Cerrar",
                      });
                    } else {
                      //Validariamos el tipo de encuesta a activarse
                      localStorage.setItem(
                        "idAsistenteDiabetes",
                        response.data.idAsistente
                      );
                      localStorage.setItem(
                        "emailAsistente",
                        response.data.correo
                      );
                      localStorage.setItem("emailQuests", email);
                      localStorage.setItem(
                        "nombreAsistente",
                        `${response.data.nombre} ${response.data.apellido}`
                      );
                      localStorage.setItem(
                        "telefonoAsistente",
                        response.data.metadaData.telefono
                      );
                      localStorage.setItem(
                        "estadoProcedenciaAsistente",
                        response.data.metadaData.estado
                      );
                      localStorage.setItem(
                        "slugQuest",
                        response.data.slugEncuesta
                      );

                      /*  switch (response.data.slugEncuesta) {
                        case "sat_con_per_pro_vir":
                          setQuestType("questOne");
                          break;

                        case "sat_con_per_pro_pre":
                          setQuestType("questTwo");
                          break;

                        case "sat_con_per_gen_vir":
                          setQuestType("questThree");
                          break;

                        case "sat_con_per_gen_pre":
                          setQuestType("questFour");
                          break;
                      } */

                      setQuestType("questGeneral");

                      setQuestState("questStarting");
                    }
                  } else {
                    Swal.fire({
                      title: "Parece que ocurrio un error",
                      text: `mande captura a soporte para ayudarle, código de error: ${response.message}`,
                      icon: "error",
                    });
                  }
                }
              }
            }}
            text="Comenzar"
          >
            <RiSurveyFill className="btnIcon" />
          </CautivaBtnForm>
        </div>
      </div>
    </div>
  );
}

export { WelcomeQuests };
