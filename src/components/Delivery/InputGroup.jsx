import React from 'react';

export default function InputGroup({
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  ...rest
}) {
  return (
    <div className="input-group">
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`input${error ? ' error' : ''}`}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
} 