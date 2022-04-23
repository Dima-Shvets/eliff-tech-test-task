import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

function Modal({ toggleModal, children }) {


  const overlayClickHandler = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
    };
    
    const onEscButtonPress = useCallback(e => {
      if (e.key === "Escape") {
       toggleModal();
     }
    }, [toggleModal])

  useEffect(() => {
    window.addEventListener('keydown', onEscButtonPress);
    return () => {
      window.removeEventListener('keydown', onEscButtonPress);
    };
  }, [onEscButtonPress]);

  return createPortal(
    <div className={s.Overlay} onClick={overlayClickHandler}>
          <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

export default Modal
