import { useEffect, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css'; // Aquí se definirán las animaciones en CSS
import { WelcomeQuests } from './pages/WelcomeQuests';
import { Quest1 } from './pages/Quest1';
import { Quest2 } from './pages/Quest2';
import { Quest3 } from './pages/Quest3';
import { Quest4 } from './pages/Quest4';
import { CautivaModal } from './components/organismos/CautivaModal';
import { SupportButton } from './components/atomos/SupportButton';

function getDate() {
  const hoy = new Date();
  
  // Obtenemos los componentes de la fecha
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const año = String(hoy.getFullYear()).slice(-2); // Solo obtenemos los últimos dos dígitos del año

  // Formateamos la fecha como 'MM/DD/YY'
  return `${mes}/${dia}/${año}`;
}



function App() {
  const [yourParamValue, setYourParamValue] = useState(null);
  const [questState, setQuestState] = useState("");
  const [questType, setQuestType] = useState("");

  useEffect(() => {
    // Obtén la URL actual
    const queryString = window.location.search;
    // Crea una instancia de URLSearchParams
    const queryParams = new URLSearchParams(queryString);
    // Obtén el valor de un parámetro de consulta específico
    const paramValue = queryParams.get('quest');

    // Actualiza el estado con el valor del parámetro
    setYourParamValue(paramValue);

    const date = getDate()
    if(date === '09/20/24'){
      setQuestState('disabledQuest')
    }else{
      setQuestState('staging')
    }
   
  }, []);



  useEffect(() => {
    // Subir el scroll al inicio cuando show cambie
    window.scrollTo(0, 0);
  }, [questState]);

  return (<>
    <SupportButton />
    <TransitionGroup>

      {questState === 'disabledQuest' && <CautivaModal disabledBtn={true}
        fn={() => {
          setQuestState('disabledQuest')
          location.reload()
        }}
        message="Lo sentimos, esta encuesta ya no está activa."
      />}

      {questState === 'staging' && (
        <CautivaModal
          fn={() => setQuestState('start')}
          message="Esta encuesta estará disponible del 07 al 20 de septiembre y es un requisito obligatorio para recibir tu constancia."
        />
      )}


     


      {questState === "start" && (
        <CSSTransition
          in={questState}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <WelcomeQuests setQuestState={setQuestState} setQuestType={setQuestType} />
        </CSSTransition>
      )}


      {(questState === "questStarting" && questType === "questOne") && <CSSTransition
        in={questState}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Quest1 />
      </CSSTransition>}

      {(questState === "questStarting" && questType === "questTwo") && <CSSTransition
        in={questState}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Quest2 />
      </CSSTransition>}

      {(questState === "questStarting" && questType === "questThree") && <CSSTransition
        in={questState}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Quest3 />
      </CSSTransition>}

      {(questState === "questStarting" && questType === "questFour") && <CSSTransition
        in={questState}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Quest4 />
      </CSSTransition>}
    </TransitionGroup>
  </>
  )
}

export default App