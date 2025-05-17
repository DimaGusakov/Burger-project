import CloseBtnIcon from '../icons/CloseBtnIcon'
import './Modal.scss'

export default function Modal({ isOpen, onClose, children, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className={`modal active`} onClick={onClose}>
      <div className={`modal__content ${className}`} onClick={e => e.stopPropagation()}>
        <div className="modal__content-close-btn" onClick={onClose}>
          <CloseBtnIcon />
        </div>
        {children}
      </div>
    </div>
  )
}
