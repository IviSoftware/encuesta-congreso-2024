// CautivaModal.jsx
import React,{useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import './CautivaModal.css';

const CautivaModal = ({  message, fn, disabledBtn }) => {

    const  [show,setShow] =useState(true);

    return (
        <> {show && <CSSTransition in={true} timeout={300} classNames="ios-fade-slide" unmountOnExit mountOnEnter>
        <div className="ios-modal-backdrop">
            <div className="ios-modal-container">
                <img src="img/iconoDiabetes.png" style={{margin:"0 auto",marginBottom:"22px"}} />
                <p className="ios-modal-text">{message}</p>
                {!disabledBtn &&  <button className="ios-modal-button" onClick={()=>{
                    setShow(false)
                    fn && fn()
                }}>
                    Entiendo
                </button> }
               
            </div>
        </div>
    </CSSTransition>}
        </>
    );
};

export { CautivaModal };
