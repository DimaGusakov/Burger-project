import CloseBtnIcon from '../icons/CloseBtnIcon'
import './Modal.scss'


export default function Modal({ children, stateModal, stateModalContent }) {
  const { modalActive, setModalActive } = stateModal;
  const { modalContent, setModalContent } = stateModalContent;

  return (
    <div onClick={() => {
      setModalActive(false);
      setModalContent(null);
    }} className={`modal ${modalActive && modalContent ? 'active' : ''}`}>
      <div className={`modal__content-${modalContent}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal__content-close-btn" onClick={() => {
          setModalActive(false);
          setModalContent(null);
        }}>
          <CloseBtnIcon />
        </div>
        {children}
      </div>
    </div>
  )
}
