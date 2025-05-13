import { auth } from '../../firebase/firebase';
import { useGetUserQuery, useAddOrderMutation } from "../../Service/databaseApi";

import { useState } from 'react'
import './Delivery.scss'
export default function Delivery({ stateModal, stateModalContent, stateCart }) {
  const { modalContent, setModalContent } = stateModalContent;
  const { modalActive, setModalActive } = stateModal;
  const { cart, totalPrice, clearCart } = stateCart;
  
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    floor: '',
    intercom: ''
  });
  const [errors, setErrors] = useState({});

  const [addOrder] = useAddOrderMutation();

  const userId = auth.currentUser?.uid
  const { data: userData, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name && !userData?.name) {
      newErrors.name = 'Введите имя';
    }
    
    if (!formData.phone && !userData?.phone) {
      newErrors.phone = 'Введите номер телефона';
    }
    
    if (deliveryType === 'delivery') {
      if (!formData.street) {
        newErrors.street = 'Введите адрес';
      }
      if (!formData.floor) {
        newErrors.floor = 'Введите этаж';
      }
      if (!formData.intercom) {
        newErrors.intercom = 'Введите код домофона';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const orderData = {
      userId,
      items: cart,
      totalPrice,
      deliveryType,
      status: 'pending',
      date: new Date().toISOString(),
      customerInfo: {
        name: formData.name || userData?.name,
        phone: formData.phone || userData?.phone,
        ...(deliveryType === 'delivery' && {
          address: {
            street: formData.street,
            floor: formData.floor,
            intercom: formData.intercom
          }
        })
      }
    };
    
    try {
      await addOrder({ userId, orderData }).unwrap();
      clearCart();
      setModalActive(false);
      setModalContent('orderSuccess');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      setErrors({ submit: 'Ошибка при оформлении заказа' });
    }
  };

  if (isLoading) return <div className='loading-delivery'>Загрузка...</div>
  if (isError) return <div>Ошибка при загрузке данных</div>

  return (
    <>
      <div className="modal-delivery__img">
        <img src="/images/donut.png" alt="Доставка" />
      </div>
      <form className='modal-delivery__form' onSubmit={handleSubmit}>
        <h4>Доставка</h4>

        <div className='modal-delivery__form-info'>
          <div className="input-group">
            <input 
              onChange={(e) => handleInputChange('name', e.target.value)} 
              value={formData.name || userData?.name || ''} 
              className={`input ${errors.name ? 'error' : ''}`} 
              type="text" 
              placeholder='Ваше имя' 
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          
          <div className="input-group">
            <input 
              onChange={(e) => handleInputChange('phone', e.target.value)} 
              value={formData.phone || userData?.phone || ''} 
              className={`input ${errors.phone ? 'error' : ''}`} 
              type="tel" 
              placeholder='Телефон' 
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
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
            <div className="input-group">
              <input 
                onChange={(e) => handleInputChange('street', e.target.value)} 
                value={formData.street} 
                className={`input ${errors.street ? 'error' : ''}`} 
                type="text" 
                placeholder='Улица, дом, квартира' 
              />
              {errors.street && <p className="error-message">{errors.street}</p>}
            </div>
            
            <div>
              <div className="input-group">
                <input 
                  onChange={(e) => handleInputChange('floor', e.target.value)} 
                  value={formData.floor} 
                  className={`input ${errors.floor ? 'error' : ''}`} 
                  type="text" 
                  placeholder='Этаж' 
                />
                {errors.floor && <p className="error-message">{errors.floor}</p>}
              </div>
              
              <div className="input-group">
                <input 
                  onChange={(e) => handleInputChange('intercom', e.target.value)} 
                  value={formData.intercom} 
                  className={`input ${errors.intercom ? 'error' : ''}`} 
                  type="text" 
                  placeholder='Домофон' 
                />
                {errors.intercom && <p className="error-message">{errors.intercom}</p>}
              </div>
            </div>
          </div>

          {errors.submit && <p className="error-message submit-error">{errors.submit}</p>}
        </div>
        <button type="submit" className='modal-delivery__button'>Оформить</button>
      </form>
    </>
  )
}