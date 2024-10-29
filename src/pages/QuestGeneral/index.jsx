import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { validateObjectFields } from "../../utils";
import { ContainerQuest } from "../../components/ContainerQuest";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { OptionsCautivaForms } from "../../components/OptionsCautivaForms";
import { OptionsWithOther } from "../../components/OptionsWithOther";
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { TextAreaCautivaForms } from "../../components/atomos/TextAreaCautivaForms";
import { GrFormNext } from "react-icons/gr";
import { CorrectQuestSend } from "../CorrectQuestSend";
import { sendData } from "../../services/userService";
import Confetti from "react-confetti";
import CautivaLoader from "../../components/atomos/CautivaLoader";

function QuestGeneral() {
  const [percentageState, setPercentageState] = useState(10);
  const [dataModule, setDataModule] = useState({});
  const [stage, setStage] = useState(1);
  const [totalStages, setTotalStages] = useState(1);
  const [sendingData, setSendingData] = useState(false);
  const [errorApiGet, setErrorApiGet] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stageConfig = [
    {
      keys: ["attendedEvent"],
      translations: [
        "¿Has asistido anteriormente a alguno de nuestros eventos?",
      ],
      percentage: 10,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "¿Has asistido anteriormente a alguno de nuestros eventos?",
            options: ["Sí", "No"],
            name: "attendedEvent",
          },
        },
      ],
    },
    {
      keys: ["residenceLocation"],
      translations: ["Tu lugar de residencia"],
      percentage: 20,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "Tu lugar de residencia es:",
            options: [
              "Ciudad de México y área metropolitana",
              "Estado de México",
              "Jalisco",
            ],
            name: "residenceLocation",
          },
        },
      ],
    },
    {
      keys: ["nationality"],
      translations: ["Tu nacionalidad"],
      percentage: 30,
      fields: [
        {
          type: "optionsWithOther",
          componentProps: {
            text: "Tu nacionalidad es:",
            options: ["Mexicana", "No mexicana"],
            name: "nationality",
          },
        },
      ],
    },
    {
      keys: ["hospitalPosition"],
      translations: ["¿Cuál es tu posición en el Hospital o Centro Académico?"],
      percentage: 40,
      fields: [
        {
          type: "optionsWithOther",
          componentProps: {
            text: "¿Cuál es tu posición en el Hospital o Centro Académico?",
            options: [
              "Médico residente de nefrología",
              "Médico residente de medicina interna",
              "Médico nefrólogo adscrito a una institución pública",
              "Médico nefrólogo con solo práctica privada",
              "Médico patólogo",
              "Investigador",
              "Estudiante de pregrado",
              "Nutriólogo (a)",
              "Enfermería",
              "Otro",
            ],
            name: "hospitalPosition",
          },
        },
      ],
    },
    {
      keys: ["likedCongress", "metExpectations"],
      translations: [
        "¿Te agradó el congreso?",
        "¿El congreso cumplió con tus expectativas?",
      ],
      percentage: 50,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "En general, ¿te agradó el congreso?",
            options: ["Sí", "No"],
            name: "likedCongress",
          },
        },
        {
          type: "options",
          componentProps: {
            text: "¿El congreso cumplió con tus expectativas?",
            options: ["Sí", "No"],
            name: "metExpectations",
          },
        },
      ],
    },
    {
      keys: ["usefulness"],
      translations: [
        "¿Qué tan útil fue la información que se presentó en este congreso?",
      ],
      percentage: 60,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "¿Qué tan útil fue la información que se presentó en este congreso?",
            options: ["Muy útil", "Útil", "Neutro", "Poco útil", "No útil"],
            name: "usefulness",
          },
        },
      ],
    },
    {
      keys: ["improvedSkills"],
      translations: ["¿El congreso mejoró sus habilidades y conocimientos?"],
      percentage: 70,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "¿El congreso mejoró sus habilidades y conocimientos?",
            options: [
              "Completamente de acuerdo",
              "De acuerdo",
              "Neutro",
              "En desacuerdo un poco",
              "Desacuerdo totalmente",
            ],
            name: "improvedSkills",
          },
        },
      ],
    },
    {
      keys: ["satisfactionLevel"],
      translations: [
        "En general, ¿qué tan satisfecho estuviste con el congreso?",
      ],
      percentage: 80,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "En general, ¿qué tan satisfecho estuviste con el congreso?",
            options: [
              "Muy insatisfecho",
              "Insatisfecho",
              "Neutral",
              "Satisfecho",
              "Muy satisfecho",
            ],
            name: "satisfactionLevel",
          },
        },
      ],
    },
    {
      keys: ["venueRating", "eventOrganization"],
      translations: [
        "¿Cómo calificarías las instalaciones?",
        "¿Cómo calificarías la organización?",
      ],
      percentage: 90,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "¿Cómo calificarías las instalaciones del Centro de convenciones y espacios del congreso?",
            options: [
              "Malas",
              "Regulares",
              "Buenas",
              "Muy buenas",
              "Excelente",
            ],
            name: "venueRating",
          },
        },
        {
          type: "options",
          componentProps: {
            text: "¿Cómo calificarías la organización del evento?",
            options: ["Muy buena", "Buena", "Aceptable", "Mala", "Muy mala"],
            name: "eventOrganization",
          },
        },
      ],
    },
    {
      keys: ["favoriteTalks", "dislikedEvent"],
      translations: ["Tus pláticas favoritas", "¿Qué no te gustó?"],
      percentage: 90,
      fields: [
        {
          type: "input",
          componentProps: {
            text: "¿Cuáles fueron tus pláticas favoritas del congreso?",
            name: "favoriteTalks",
          },
        },
        {
          type: "optionsWithOther",
          componentProps: {
            text: "¿Qué no te gustó de este evento?",
            options: [
              "Área de registro",
              "Programa académico",
              "Área comercial",
              "Alimentos y bebidas",
              "Comunicados y redes sociales",
              "Hotel y distancia al Centro de convenciones",
              "Todo me gustó",
              "Otras",
            ],
            name: "dislikedEvent",
          },
        },
      ],
    },
    {
      keys: ["futureAttendance", "comments"],
      translations: ["¿Asistirías a otro evento?", "Comentarios o sugerencias"],
      percentage: 95,
      fields: [
        {
          type: "options",
          componentProps: {
            text: "¿Asistirías a otro evento como este en el futuro?",
            options: ["Sí", "No"],
            name: "futureAttendance",
          },
        },
        {
          type: "textarea",
          componentProps: {
            text: "¿Tienes algún otro comentario o sugerencia que nos ayude a mejorar los eventos futuros?",
            name: "comments",
            max: 500,
          },
        },
      ],
    },
  ];

  const validateStageFields = (stageIndex) => {
    const { keys, translations } = stageConfig[stageIndex];
    const response = validateObjectFields(dataModule, keys, translations);

    if (response.validate === 0) {
      Swal.fire({
        title: "Faltan por rellenar",
        text: `Los siguientes campos están vacíos: ${response.fields.join(
          ", "
        )}`,
        icon: "info",
      });
      return false;
    } else if (response.validate === 1) {
      return true;
    } else {
      Swal.fire({
        title: "Por favor rellene todos los campos",
        icon: "info",
      });
      return false;
    }
  };

  const handleNextStage = () => {
    if (validateStageFields(stage - 1)) {
      console.log("siguiente");
      if (stage <= totalStages) {
        // Avanza al siguiente stage y actualiza el porcentaje
        setStage(stage + 1);
        setPercentageState(stageConfig[stage].percentage); // Usa `stage` como índice
      }
    }
  };

  const handleFinish = async () => {
    if (validateStageFields(stage - 1)) {
      try {
        const slug = "sat_con_gen"; // Define el slug según tus necesidades
        const response = await sendData(dataModule, slug);

        console.log("Respuesta de sendData:", response);
        setPercentageState(100);
        // Aquí puedes añadir cualquier acción posterior, como una notificación de éxito
      } catch (error) {
        console.error("Error al enviar datos:", error);
        // Manejo de errores, como mostrar un mensaje de error
      }
    }
  };

  useEffect(() => {
    setTotalStages(stageConfig.length - 1);
  }, []);

  return (
    <ContainerQuest
      title="Encuesta de satisfacción del LXXI Internacional en Nefrología IMIN 2024"
      percentageState={percentageState}
    >
      {percentageState !== 100 &&
        stageConfig.map((config, index) =>
          stage === index + 1 ? (
            <div key={index} className="w-full flex flex-col gap-6">
              {config.fields.map((field, idx) => {
                switch (field.type) {
                  case "input":
                    return (
                      <InputCautivaForms
                        key={idx}
                        setDataModule={setDataModule}
                        dataModule={dataModule}
                        {...field.componentProps}
                      />
                    );
                  case "options":
                    return (
                      <OptionsCautivaForms
                        key={idx}
                        setDataModule={setDataModule}
                        dataModule={dataModule}
                        {...field.componentProps}
                      />
                    );
                  case "optionsWithOther":
                    return (
                      <OptionsWithOther
                        key={idx}
                        setDataModule={setDataModule}
                        dataModule={dataModule}
                        {...field.componentProps}
                      />
                    );
                  case "textarea":
                    return (
                      <TextAreaCautivaForms
                        key={idx}
                        setDataModule={setDataModule}
                        dataModule={dataModule}
                        {...field.componentProps}
                      />
                    );
                  default:
                    return null;
                }
              })}
              <CautivaBtnForm
                text={stage === totalStages + 1 ? "Enviar" : "Continuar"}
                onClick={
                  stage === totalStages + 1 ? handleFinish : handleNextStage
                }
              >
                <GrFormNext className="btnIcon" />
              </CautivaBtnForm>
            </div>
          ) : null
        )}

      {percentageState === 100 && (
        <div className="w-full flex flex-col gap-6">
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
          />
          <CorrectQuestSend />
        </div>
      )}
    </ContainerQuest>
  );
}

export { QuestGeneral };
