import React from 'react';
import InputGroup from './InputGroup';

export default function DeliveryAddressFields({ formData, errors, handleInputChange, isActive }) {
  return (
    <div className={`delivery-address${isActive ? ' active' : ''}`}>
      <InputGroup
        value={formData.street}
        onChange={e => handleInputChange('street', e.target.value)}
        placeholder='Улица, дом, квартира'
        error={errors.street}
      />
      <div>
        <InputGroup
          value={formData.floor}
          onChange={e => handleInputChange('floor', e.target.value)}
          placeholder='Этаж'
          error={errors.floor}
        />
        <InputGroup
          value={formData.intercom}
          onChange={e => handleInputChange('intercom', e.target.value)}
          placeholder='Домофон'
          error={errors.intercom}
        />
      </div>
    </div>
  );
} 