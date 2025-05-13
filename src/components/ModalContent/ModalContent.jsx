import Modal from "../Modal/Modal";
import InfoCart from "../InfoCard/InfoCard.jsx";
import Delivery from "../Delivery/Delivery.jsx";
import './ModalContent.scss'
export default function ModalContent({ stateModalContent, stateModal, stateCart, stateSelectedProduct }) {
  const { modalContent, setModalContent } = stateModalContent;
  const { modalActive, setModalActive } = stateModal;
  return (
    <Modal stateModal={stateModal} stateModalContent={stateModalContent}>
        {modalContent === 'product' && <InfoCart stateSelectedProduct={stateSelectedProduct} stateCart={stateCart} stateModal={stateModal} stateModalContent={stateModalContent} />}
        {modalContent === 'delivery' && <Delivery stateModal={stateModal} stateModalContent={stateModalContent} stateCart={stateCart} />}
        {modalContent === 'orderSuccess' && (
          <div className="modal-success">
            <div className="modal-success__img">
              <img src="/images/success.png" alt="Успешно" />
            </div>
            <div className="modal-success__content">
              <h3>Заказ успешно оформлен!</h3>
              <p>Мы уже начали готовить вашу еду. Скоро с вами свяжется наш менеджер.</p>
              <button onClick={() => {
                setModalActive(false);
                setModalContent(null);
              }} className="modal-success__button">Отлично!</button>
            </div>
          </div>
        )}
    </Modal>
  )
}
