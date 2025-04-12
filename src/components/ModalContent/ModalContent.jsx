import Modal from "../Modal/Modal";
import InfoCart from "../InfoCard/InfoCard.jsx";
import Delivery from "../Delivery/Delivery.jsx";
import './ModalContent.scss'
export default function ModalContent({ stateModalContent, stateModal, stateCart, stateSelectedProduct }) {
  const { modalContent, setModalContent } = stateModalContent;
  const { selectedProduct, setSelectedProduct } = stateSelectedProduct;
  const { modalActive, setModalActive } = stateModal;
  const { cart, setCart } = stateCart;
    
  


    return (
    <Modal stateModal={stateModal} stateModalContent={stateModalContent}>
        {modalContent === 'product' && <InfoCart stateSelectedProduct={stateSelectedProduct} stateCart={stateCart} stateModal={stateModal} stateModalContent={stateModalContent} />}
        {modalContent === 'delivery' && <Delivery stateModal={stateModal} stateModalContent={stateModalContent} />}
    </Modal>
  )

}
