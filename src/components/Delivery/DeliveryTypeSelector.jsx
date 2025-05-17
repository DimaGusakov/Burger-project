import React from 'react';

export default function DeliveryTypeSelector({ deliveryType, setDeliveryType }) {
  return (
    <div className='delivery-type' onChange={e => setDeliveryType(e.target.value)}>
      <div>
        <input
          className='delivery-type__radio'
          type='radio'
          id='pickup'
          name='deliveryType'
          value='pickup'
          checked={deliveryType === 'pickup'}
          readOnly
        />
        <span className='custom-radio'></span>
        <label htmlFor='pickup'>Самовывоз</label>
      </div>
      <div>
        <input
          className='delivery-type__radio'
          type='radio'
          id='delivery'
          name='deliveryType'
          value='delivery'
          checked={deliveryType === 'delivery'}
          readOnly
        />
        <span className='custom-radio'></span>
        <label htmlFor='delivery'>Доставка</label>
      </div>
    </div>
  );
} 