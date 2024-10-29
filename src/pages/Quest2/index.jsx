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
import CautivaLoader from "../../components/atomos/CautivaLoader";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Quest2() {
  const [percentageState, setPercentageState] = useState(10);
  const [dataModule, setDataModule] = useState([]);
  const [stage, setStage] = useState(1);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [sendingData, setSendingData] = useState(false);
  const [errorApiGet, setErrorApiGet] = useState(false);
  const { fullName, estadoProcedenciaAsistente } = getBasicData();

  const keysToValidate1 = [
    "extraEdad",
    "extraEstadoProcedencia",
    "extraPerfil",
  ];
  const keysTraduction1 = ["Edad", "Estado de procedencia", "Perfil"];

  const keysToValidate2 = ["extraEspecialidad"];
  const keysTraduction2 = ["Especialidad"];

  const keysToValidate3 = [
    "extraConsulta",
    "extraInstitucionTrabajo",
    "extraMedioEnteroCongreso",
    "extraInstalacionSedeCongresoAdecuada",
    "extraDistribucionSalonesAdecuada",
    "extraMediosAudiovisualesAdecuados",
    "extraZonaComercialInfoRelevanteObjetivoCongreso",
    "extraViajeSaludIdeaInnovadoraAcordeObjectivoCongreso",
    "extraTemasActuales",
  ];
  const keysTraduction3 = [
    "Consulta",
    "Institución de trabajo",
    "Medio por el que se enteró del congreso",
    "Instalaciones adecuadas",
    "Distribución de los salones",
    "Medios audiovisuales",
    "Stands en zona comercial",
    "Viaje por la salud",
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
    "Nivel contenidos",
    "Distribución actividades",
    "Tiempo actividades",
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
    "Conferencia interesante 1",
    "Conferencia interesante 2",
    "Organización satisfactoria",
    "Cumplimiento de expectativas",
    "Escala objetivo académico",
    "Recomendación del congreso",
    "Asistencia a próximo congreso",
  ];

  const keysToValidate6 = ["extraObservacionesConclusiones"];
  const keysTraduction6 = ["Observaciones"];

  const [typeError, setTypeError] = useState("");

  const sendDataToAPI = async () => {
    setSendingData(true);
    try {
      const apiResponse = await sendData(dataModule, "sat_con_per_pro_pre");
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
      title="Encuesta de satisfacción Profesionales (Presencial)"
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
            text="Perfil"
            options={["Profesional de la salud", "Enfermera(o)", "Estudiante"]}
            name="extraPerfil"
          />
          <CautivaBtnForm
            text="Continuar"
            onClick={() => {
              const response = validateObjectFields(
                dataModule,
                keysToValidate1,
                keysTraduction1,
                setDataModule
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

      {/* Etapa 2 */}
      {stage === 2 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Especialidad"
            options={[
              "Nutrición",
              "Medicina general",
              "Odontología",
              "Psicología",
              "Optometría",
              "Enfermería",
              "Fisioterapeuta",
              "Química/farmacobiología",
              "Activador/Profesor de educación física",
              "Podiatra/Podólogo",
              "Medicina interna",
              "Cardiología",
              "Endocrinología",
              "Ginecología",
              "Nefrología",
              "Oftalmología",
              "Otro",
            ]}
            name="extraEspecialidad"
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

      {/* Etapa 3 */}
      {stage === 3 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Consulta"
            options={["Pública", "Privada", "Ambas", "No doy consulta"]}
            name="extraConsulta"
          />
          <InputCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            type="text"
            text="Institución de trabajo"
            name="extraInstitucionTrabajo"
          />
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
            text="¿Consideras que las instalaciones sede del congreso fueron adecuadas?"
            options={["Sí", "No"]}
            name="extraInstalacionSedeCongresoAdecuada"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="La distribución de los salones fue adecuada"
            options={["Sí", "No"]}
            name="extraDistribucionSalonesAdecuada"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Los medios audiovisuales dentro de cada ponencia fueron adecuados y visibles en las transmisiones (pantallas, audios, etc.?"
            options={["Sí", "No"]}
            name="extraMediosAudiovisualesAdecuados"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Los stands en la zona comercial contaban con información relevante y complementaria al objetivo del congreso."
            options={["Sí", "No"]}
            name="extraZonaComercialInfoRelevanteObjetivoCongreso"
          />
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="¿Consideras que el viaje por la salud fue una idea innovadora y acorde al objetivo del congreso?"
            options={["Sí", "No"]}
            name="extraViajeSaludIdeaInnovadoraAcordeObjectivoCongreso"
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

      {/* Etapa 4 */}
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
            text="La distribución de actividades (ponencias y talleres) fue"
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
            text="Crees que los ponentes proporcionaron una buena comunicación durante las actividades"
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
                setPercentageState(85);
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

      {/* Etapa 5 */}
      {stage === 5 && (
        <div className="w-full flex flex-col gap-6">
          <OptionsCautivaForms
            setDataModule={setDataModule}
            dataModule={dataModule}
            text="Consideras que los ponentes y actividades cumplieron los objetivos del programa"
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
            text="Consideras que la organización general del congreso ha sido satisfactoria"
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
            label="En una escala del 1 al 10 ¿Considera que el congreso cumplió con su objetivo académico ? ( donde, 1 no cumplió y 10 completamente )"
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
                setPercentageState(95);
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

      {/* Etapa 6 */}
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

      {/* Etapa 7 */}
      {stage === 7 && (
        <div className="w-full flex flex-col gap-6">
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false} // Confeti se lanza una sola vez
          />
          <CorrectQuestSend />
        </div>
      )}
    </ContainerQuest>
  );
}

export { Quest2 };
