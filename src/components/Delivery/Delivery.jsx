import { auth } from '../../firebase/firebase';
import { useGetUserQuery, useAddOrderMutation } from "../../Service/databaseApi";
import { useState } from 'react';
import './Delivery.scss';
import InputGroup from './InputGroup';
import DeliveryTypeSelector from './DeliveryTypeSelector';
import DeliveryAddressFields from './DeliveryAddressFields';

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

  const userId = auth.currentUser?.uid;
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
      if (!formData.street) newErrors.street = 'Введите адрес';
      if (!formData.floor) newErrors.floor = 'Введите этаж';
      if (!formData.intercom) newErrors.intercom = 'Введите код домофона';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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

  if (isLoading) return <div className='loading-delivery'>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;

  return (
    <>
      <div className="modal-delivery__img">
        <img src="/images/donut.png" alt="Доставка" />
      </div>
      <form className='modal-delivery__form' onSubmit={handleSubmit}>
        <h4>Доставка</h4>
        <div className='modal-delivery__form-info'>
          <InputGroup
            value={formData.name || userData?.name || ''}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder='Ваше имя'
            error={errors.name}
          />
          <InputGroup
            value={formData.phone || userData?.phone || ''}
            onChange={e => handleInputChange('phone', e.target.value)}
            type='tel'
            placeholder='Телефон'
            error={errors.phone}
          />
        </div>
        <div className='modal-delivery__form-delivery-type'>
          <DeliveryTypeSelector deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
          <DeliveryAddressFields
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            isActive={deliveryType === 'delivery'}
          />
          {errors.submit && <p className="error-message submit-error">{errors.submit}</p>}
        </div>
        <button type="submit" className='modal-delivery__button'>Оформить</button>
      </form>
    </>
  );
}