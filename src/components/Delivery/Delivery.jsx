import deliveryImg from '../../assets/donut.png'
import { auth } from '../../firebase/firebase';
import { useGetUserQuery } from "../../Service/databaseApi";

import { useState } from 'react'
import './Delivery.scss'
export default function Delivery({ stateModal, stateModalContent }) {
  const { modalContent, setModalContent } = stateModalContent;
  const [deliveryType, setDeliveryType] = useState('delivery');

  const userId = auth.currentUser?.uid
  const { data: userData, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId
  })
  if (isLoading) return <div className='loading-delivery'>Загрузка...</div>
  if (isError) return <div>Ошибка при загрузке данных</div>

  return (
    <>
      <div className="modal-delivery__img">
        <img src={deliveryImg} alt="Доставка" />
      </div>
      <form className='modal-delivery__form'>
        <h4>Доставка</h4>

        <div className='modal-delivery__form-info'>
          <input onChange={(e) => e.target.value} value={userData.name} className='input' type="text" placeholder='Ваше имя' />
          <input onChange={(e) => e.target.value} value={userData.phone} className='input' type="tel" placeholder='Телефон' />
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
              <input defaultChecked className='delivery-type__radio' type="radio" id="delivery" name="deliveryType" value='delivery' />
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

          
        </div>
        <button onClick={() => {
          setModalDeliveryActive(false);
          setModalContent(null);
        }} className='modal-delivery__button'>Оформить</button>
      </form>
    </>


  )
}