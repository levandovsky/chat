import React, { forwardRef, Ref } from 'react';
import { FieldError } from 'react-hook-form';
import './InputComponent.scss';

export interface InputComponentProps {
  type: 'number' | 'text' | 'password';
  value?: string | number;
  className?: string;
  error?: FieldError | undefined;
  placeholder?: string;
  name?: string;
}
export const InputComponent = forwardRef(
  (
    { value, className, error, placeholder, type, name }: InputComponentProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={`form-field ${className}`}>
        <input
          name={name}
          value={value}
          className={`${className} ${error ? 'invalid' : ''}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
        />
        {error && <span className="error">{error.message}</span>}
      </div>
    );
  }
);
