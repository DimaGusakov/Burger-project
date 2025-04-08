import deliveryImg from '../../assets/donut.png'
import CloseBtn from '../../assets/close-btn.svg?react'
import { useState } from 'react'
import './ModalDelivery.scss'
export default function ModalDelivery({ stateDeliveryModal }) {
  const { modalDeliveryActive, setModalDeliveryActive } = stateDeliveryModal;
  const [deliveryType, setDeliveryType] = useState('delivery');

  
  return (
    <div className={`modal-delivery ${modalDeliveryActive ? 'active' : ''}`} onClick={() => {
      setModalDeliveryActive(false);
    }}>
      <div className="modal-delivery__wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="modal-delivery__close-btn" onClick={() => {
          setModalDeliveryActive(false);
        }}>
          <CloseBtn />
        </button>
        <div className="modal-delivery__img">
          <img src={deliveryImg} alt="Доставка" />
        </div>
        <form className='modal-delivery__form'>
          <h4>Доставка</h4>
        
          <div className='modal-delivery__form-info'>
            <input className='input' type="text" placeholder='Ваше имя' />
            <input className='input' type="tel" placeholder='Телефон' />
          </div>
          <div className='modal-delivery__form-delivery-type'>
            <div className='delivery-type' onChange={(e) => {
              setDeliveryType(e.target.value);
            }}>
              
              <div>
                <input className='delivery-type__radio' type="radio" id="pickup" name="deliveryType" value='pickup' />
                <span className='custom-radio'></span>

                <label htmlFor="pickup">Самовывоз</label>
              </div>
              <div>
                <input defaultChecked className='delivery-type__radio' type="radio" id="delivery" name="deliveryType"  value='delivery' />
                <span className='custom-radio'></span>
               
                <label htmlFor="delivery">Доставка</label>
              </div>
              
            </div>


            <div className={`delivery-address ${deliveryType === 'delivery' ? 'active' : ''}`}>
              <input className='input' type="text" placeholder='Улица, дом, квартира' />
              <div>
                <input className='input' type="text" placeholder='Этаж' />
                <input className='input' type="text" placeholder='Домофон' />
              </div>
            </div>

            <button  className='modal-delivery__button'>Оформить</button>
          </div>
        </form>
      </div>
    </div>
  )
}