import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { validateObjectFields, getBasicData } from "../../utils";
import { ContainerQuest } from "../../components/ContainerQuest";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { OptionsCautivaForms } from "../../components/OptionsCautivaForms";
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { OptionsScale } from "../../components/atomos/OptionsScale";
import { GrFormNext } from "react-icons/gr";
import { TextAreaCautivaForms } from "../../components/atomos/TextAreaCautivaForms";
import { CorrectQuestSend } from "../CorrectQuestSend";
import Confetti from "react-confetti";
import { sendData } from "../../services/userService";
import { NumberCautivaInput } from "../../components/atomos/NumberCautivaInput";
import CautivaLoader from "../../components/atomos/CautivaLoader";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Quest3() {
  const [percentageState, setPercentageState] = useState(10);
  const [dataModule, setDataModule] = useState([]);
  const [stage, setStage] = useState(1);
  const [sendingData, setSendingData] = useState(false);
  const [errorApiGet, setErrorApiGet] = useState(false);
  const { fullName, estadoProcedenciaAsistente, telefonoAsistente } =
    getBasicData();

  const keysToValidate1 = [
    "extraEdad",
    "extraEstadoProcedencia",
    "extraVivesCon",
  ];
  const keysTraduction1 = ["Edad", "Estado de procedencia", "Vives con"];

  const keysToValidate2 = ["extraTelefono"];
  const keysTraduction2 = ["Teléfono"];

  const keysToValidate3 = [
    "extraMedioEnteroCongreso",
    "extraKitCongresistaAdecuado",
    "extraTransmisionPonenciasAdecuada",
    "extraMediosAudiovisualesAdecuados",
    "extraTemasActuales",
  ];
  const keysTraduction3 = [
    "Medio por el que se enteró del congreso",
    "Kit adecuado",
    "Transmisión adecuada",
    "Medios audiovisuales",
    "Temas abordados",
  ];

  const keysToValidate4 = [
    "extraNivelContenidos",
    "extraDistribucionActividades",
    "extraTiempoActividades",
    "extraSeleccionPonentes",
    "extraParticipacionPonentes",
    "extraComunicacionPonentes",
  ];
  const keysTraduction4 = [
    "Nivel de contenidos",
    "Distribución de actividades",
    "Tiempo de actividades",
    "Selección de ponentes",
    "Participación de ponentes",
    "Comunicación de ponentes",
  ];

  const keysToValidate5 = [
    "extraCumplieronObjetivos",
    "extraPlenariasInteresantes1",
    "extraPlenariasInteresantes2",
    "extraOrganizacionCongreso",
    "extraCongresoCumplioExpectativas",
    "extraEscalaObjetivoAcademico",
    "extraRecomendariaCongreso",
    "extraAcudiria34Congreso",
  ];
  const keysTraduction5 = [
    "Cumplimiento de objetivos",
    "Plenarias interesantes",
    "Plenarias interesantes 2",
    "Organización del congreso",
    "Cumplimiento de expectativas",
    "Escala de objetivo académico",
    "Recomendación del congreso",
    "Acudiras al congreso",
  ];

  const keysToValidate6 = ["extraObservacionesConclusiones"];
  const keysTraduction6 = ["Observaciones"];

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [typeError, setTypeError] = useState("");

  const sendDataToAPI = async () => {
    setSendingData(true);
    try {
      const apiResponse = await sendData(dataModule, "sat_con_per_gen_vir");
      if (apiResponse.title === "error") {
        setErrorApiGet(true);
      }

      setSendingData(false);
    } catch (error) {
      setErrorApiGet(true);
      console.error("Ocurrio un error en la petición", error);
      setTypeError(error);
      setSendingData(false);
    }
  };

  return (
    <ContainerQuest
      title="Encuesta de satisfacción Personas que viven con diabetes, familiares y público en general (Virtual)"
      percentageState={percentageState}
    >
      {stage === 1 && (
        <div className="w-full flex flex-col gap-6">
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            text="Nombre completo"
            name="extraNombreCompleto"
            valueUser={fullName}
          />
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="number"
            text="Edad"
            name="extraEdad"
            max={3}
          />
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            text="Estado de procedencia"
            name="extraEstadoProcedencia"
            valueUser={estadoProcedenciaAsistente}
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Vives con"
            options={[
              "Diabetes tipo 1",
              "Diabetes tipo 2",
              "Diabetes gestacional",
              "Prediabetes",
              "Familiares con diabetes",
              "Interesado en el tema",
              "Otro",
            ]}
            name="extraVivesCon"
          />
          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate1,
                keysTraduction1
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 4) {
                Swal.fire({
                  title:
                    "Por favor coloque una edad valida, mayores de 18 años",
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(2);
                setPercentageState(30);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {stage === 2 && (
        <div className="w-full flex flex-col gap-6">
          <NumberCautivaInput
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Teléfono"
            name="extraTelefono"
            valueUser={telefonoAsistente}
          />

          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate2,
                keysTraduction2
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(3);
                setPercentageState(50);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {stage === 3 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Medio por el que se enteró del congreso"
            options={[
              "Revista Diabetes Hoy",
              "Redes sociales",
              "Correo electrónico",
              "Invitación directa",
            ]}
            name="extraMedioEnteroCongreso"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Consideras que el kit de congresista fue adecuado?"
            options={["Sí", "No"]}
            name="extraKitCongresistaAdecuado"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿La transmisión de las ponencias fue adecuada?"
            options={["Sí", "No"]}
            name="extraTransmisionPonenciasAdecuada"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Los medios audiovisuales dentro de cada ponencia fueron adecuados y visibles en las transmisiones (pantallas, audios, presentaciones, etc.)"
            options={["Sí", "No"]}
            name="extraMediosAudiovisualesAdecuados"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Te parece que los temas abordados en el programa son de actualidad y necesarios para cumplir el objetivo del congreso?"
            options={["Sí", "No"]}
            name="extraTemasActuales"
          />
          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate3,
                keysTraduction3
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(4);
                setPercentageState(70);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {stage === 4 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="El nivel de los contenidos abordados ha sido"
            options={["Excelente", "Muy bueno", "Bueno", "Regular", "Malo"]}
            name="extraNivelContenidos"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="La distribución de actividades fue"
            options={["Adecuada", "Saturada"]}
            name="extraDistribucionActividades"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="El tiempo asignado a cada una de las actividades fue"
            options={["Excelente", "Bueno", "Insuficiente"]}
            name="extraTiempoActividades"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="La selección de los ponentes ha sido"
            options={["Excelente", "Muy buena", "Buena", "Mala", "Indiferente"]}
            name="extraSeleccionPonentes"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="La participación de los ponentes ha sido"
            options={["Excelente", "Muy buena", "Buena", "Mala", "Muy mala"]}
            name="extraParticipacionPonentes"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Crees que los ponentes han propiciado una buena comunicación durante las actividades?"
            options={["Sí", "No"]}
            name="extraComunicacionPonentes"
          />
          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate4,
                keysTraduction4
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(5);
                setPercentageState(90);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {stage === 5 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Consideras que los ponentes y actividades han cumplido los objetivos del programa?"
            options={["Sí", "No"]}
            name="extraCumplieronObjetivos"
          />

          <label className="TextTitleFormComponent">
            Menciona al menos dos plenarias, simposios o talleres que te
            parecieron más interesantes del congreso
          </label>
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            name="extraPlenariasInteresantes1"
          />
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            name="extraPlenariasInteresantes2"
          />

          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Consideras que la organización general del congreso fue satisfactoria?"
            options={["Sí", "No"]}
            name="extraOrganizacionCongreso"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿El congreso cumplió tus expectativas?"
            options={["Sí", "No", "A medias"]}
            name="extraCongresoCumplioExpectativas"
          />
          <OptionsScale
            name="extraEscalaObjetivoAcademico"
            label="En una escala del 1 al 10 ¿Consideras que el congreso cumplió con su objetivo académico?  (donde, 1 no cumplió y 10 completamente)"
            setDataModule={setDataModule}
            dataModule={dataModule}
          />
          <OptionsScale
            name="extraRecomendariaCongreso"
            label="Recomendarías a un familiar, amigo o colega asistir al Congreso Nacional de la Federación Mexicana de Diabetes, A.C. ( donde, 1 Definitivamente no y 10 Definitivamente si )"
            setDataModule={setDataModule}
            dataModule={dataModule}
          />
          <OptionsScale
            name="extraAcudiria34Congreso"
            label="Acudirías al 34° Congreso Nacional de Diabetes  (donde, 1 Definitivamente no y 10 Definitivamente si)"
            setDataModule={setDataModule}
            dataModule={dataModule}
          />
          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate5,
                keysTraduction5
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(6);
                setPercentageState(100);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {stage === 6 && (
        <div className="w-full flex flex-col gap-6">
          <TextAreaCautivaForms
            text="Por favor, redacta tus observaciones y conclusiones del congreso"
            name="extraObservacionesConclusiones"
            max={500}
            setDataModule={setDataModule}
            dataModule={dataModule}
          />

          <CautivaBtnForm
            text="Enviar encuesta"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate6,
                keysTraduction6
              );
              if (response.validate === 0) {
                Swal.fire({
                  title: "Faltan por rellenar",
                  text: `Los siguientes campos están vacíos: ${response.fields.join(
                    ", "
                  )}`,
                  icon: "info",
                });
              } else if (response.validate === 1) {
                setStage(7);
                setPercentageState(100);

                window.scrollTo({ top: 0, behavior: "smooth" });
                sendDataToAPI();
              } else {
                Swal.fire({
                  title: "Por favor rellene todos los campos",
                  icon: "info",
                });
              }
            }}
          >
            <GrFormNext className="btnIcon" />
          </CautivaBtnForm>
        </div>
      )}

      {sendingData && (
        <div className="w-full flex flex-col gap-6">
          <CSSTransition
            in={sendingData}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="w-full flex flex-col gap-6">
              <CautivaLoader />
            </div>
          </CSSTransition>
        </div>
      )}

      {errorApiGet && (
        <>
          <p>Ocurrio un error , contacte a soporte : {typeError}</p>
        </>
      )}

      {stage === 7 && (
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

export { Quest3 };
